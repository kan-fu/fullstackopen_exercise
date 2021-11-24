import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const filterText = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterText.toLowerCase())
    )
  )
  const dispatch = useDispatch()

  const handleClick = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`,3))
    // setTimeout(() => dispatch(hide()), 5000)
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
