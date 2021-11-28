import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import {
  sortBlogsAction,
  updateBlogAction,
  deleteBlogAction,
} from "../reducers/blogsReducer"
import Comments from "./Comments"
import { setNotificationAction } from "../reducers/notificationReducer"

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const params = useParams()
  const blog = blogs.find((blog) => blog.id === params.blogId)
  const navigate = useNavigate()

  if (!blog) {
    return null
  }
  const dispatch = useDispatch()

  const handleLike = async () => {
    const updatedBlog = { id: blog.id, likes: blog.likes + 1 }
    await dispatch(updateBlogAction(updatedBlog))
    dispatch(sortBlogsAction())
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await dispatch(deleteBlogAction(blog.id))
      navigate("/")
      dispatch(
        setNotificationAction(`blog ${blog.title} deleted!`, "warning", 3)
      )
    }
  }

  const isAuthorEqualLoggedUser = blog.user.username === user.username

  return (
    <div className='blog'>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        <span className='likesCount'>{blog.likes}</span> likes
        <button className='likeButton' onClick={handleLike}>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      {isAuthorEqualLoggedUser && (
        <button className='deleteButton' onClick={handleDelete}>
          delete
        </button>
      )}
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
