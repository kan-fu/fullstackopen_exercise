import React from "react"
import { connect } from "react-redux"
import { vote, createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.createAnecdote(content)
    // dispatch(createAnecdote(content))

    props.setNotification(`New anecdote '${content}'`, 3)
    // dispatch(setNotification(`New anecdote '${content}'`,3))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
