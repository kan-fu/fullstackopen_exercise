import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import Users from "./components/Users"
import User from "./components/User"
import Menu from "./components/Menu"
import Notification from "./components/Notification"
import { Container } from "@mui/material"
import { reLoginAction } from "./reducers/loginReducer"

import { Routes, Route } from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(reLoginAction())
  }, [])

  if (user === null) {
    return <LoginForm />
  }
  return (
    <Container>
      <Menu />
      <Notification />
      <Routes>
        <Route path='users/:userId' element={<User />} />
        <Route path='users/*' element={<Users />} />
        <Route path='blogs/:blogId' element={<Blog />} />
        <Route path='/' element={<Blogs />} />
      </Routes>
    </Container>
  )
}

export default App
