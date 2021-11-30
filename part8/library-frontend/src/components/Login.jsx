import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const Login = ({ show, token, setToken, setPage, getMe }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message),
  })

  useEffect(() => {
    if (data) {
      const token = data.login.value
      setToken(token)
      localStorage.setItem("library-token", token)
      setPage("books")
      getMe()
    }
  }, [data])  // eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }
  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
