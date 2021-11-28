import React, { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material"

import {
  sortBlogsAction,
  getBlogsAction,
  addBlogAction,
} from "../reducers/blogsReducer"

import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "2px solid black",
    margin: 0,
    marginBottom: 5,
  }
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (obj) => {
    await dispatch(addBlogAction(obj))
    dispatch(sortBlogsAction())
    blogFormRef.current.toggleVisibility()
  }
  useEffect(async () => {
    await dispatch(getBlogsAction())
    dispatch(sortBlogsAction())
  }, [])

  return (
    <>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} style={blogStyle}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Blogs
