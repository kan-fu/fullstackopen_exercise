import anecdoteService from "../services/anecdotes"
const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// })

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch=>{
    const updatedObj = { ...anecdote, votes: anecdote.votes + 1}
    const returnedObj = await anecdoteService.updateOne(anecdote.id, updatedObj)
    dispatch({
      type: "VOTE",
      data: returnedObj
    })
  }

  // type: "VOTE",
  // data: {
  //   id,
  // },
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote,
    })
  }
}

const reducer = (state = [], action) => {
  // console.log("state now: ", state)
  // console.log("action", action)
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      // const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      // const changedAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1,
      // }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.data
      )
    case "ADD_ANECDOTE":
      return [...state, action.data]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export default reducer
