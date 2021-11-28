import React from "react"
import { useDispatch } from "react-redux"
import { addCommentAction } from "../reducers/blogsReducer"

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addCommentAction(blog.id, e.target.comment.value))
    e.target.comment.value = ""
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input name='comment' />
        <button>add comment</button>
      </form>

      {blog.comments.length !== 0 && (
        <ul>
          {blog.comments.map((comment, ind) => (
            <li key={ind}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Comments
