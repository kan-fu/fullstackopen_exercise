import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotificationAction } from "../reducers/notificationReducer"
import { TextField, Button, Box } from "@mui/material"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
    dispatch(
      setNotificationAction(
        `a new blog ${newTitle} by ${newAuthor}`,
        "success",
        3
      )
    )
  }

  return (
    <form onSubmit={addBlog}>
      <Box sx={{ display: "flex", flexFlow: "row", mb: 1 }}>
        <TextField
          value={newTitle}
          label='title'
          id='title'
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          id='author'
          label='author'
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <TextField
          id='url'
          label='url'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </Box>
      <Button type='submit' color='primary' variant='outlined'>
        save
      </Button>
    </form>
  )
}

export default BlogForm
