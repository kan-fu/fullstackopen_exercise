import React from "react"
import { Button, AppBar, Toolbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { logoutUserAction } from "../reducers/loginReducer"
import { Link, useNavigate } from "react-router-dom"

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return null
  }
  const handleLogout = () => {
    dispatch(logoutUserAction())
    navigate("/")
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        <em>{user.username} logged in</em>
        <button onClick={handleLogout}>logout</button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
