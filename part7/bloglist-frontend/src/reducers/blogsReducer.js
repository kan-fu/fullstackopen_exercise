import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SORT_BLOG":
      return [...state].sort((a, b) => b.likes - a.likes)
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.payload)
    case "ADD_BLOG":
      return [...state, action.payload]
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    case "SET_BLOG":
      return action.payload
    default:
      return state
  }
}

export const getBlogsAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "SET_BLOG",
      payload: blogs,
    })
  }
}

export const sortBlogsAction = () => ({
  type: "SORT_BLOG",
})

export const addBlogAction = (obj) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(obj)
    dispatch({
      type: "ADD_BLOG",
      payload: newBlog,
    })
  }
}

export const deleteBlogAction = (deletedId) => {
  return async (dispatch) => {
    await blogService.deleteBlog(deletedId)
    dispatch({
      type: "DELETE_BLOG",
      payload: deletedId,
    })
  }
}

export const updateBlogAction = (obj) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(obj)
    dispatch({
      type: "UPDATE_BLOG",
      payload: returnedBlog,
    })
  }
}

export const addCommentAction = (id, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: "UPDATE_BLOG",
      payload: returnedBlog,
    })
  }
}

export default reducer
