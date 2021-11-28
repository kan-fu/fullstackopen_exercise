import React from "react"
// import PropTypes from "prop-types"
import Notification from "./Notification"
import { useDispatch } from "react-redux"
import { loginUserAction } from "../reducers/loginReducer"
import { TextField, Button, Container } from "@mui/material"

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    dispatch(loginUserAction(e))
  }
  return (
    <Container sx={{ p: 2 }}>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='username'
            id='username'
            name='username'
            type='text'
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            label='password'
            id='password'
            name='password'
            type='password'
          />
        </div>
        <Button sx={{ mt: 2 }} variant='outlined' color='primary' type='submit'>
          login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm
