import React, { useState, useEffect } from "react"
import { useApolloClient } from "@apollo/client"
import { useLazyQuery } from "@apollo/client"

import { ME } from "./queries"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommended from "./components/Recommended"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  // const { loading, error, data } = useQuery(ME)
  const [getMe, { loading, error, data }] = useLazyQuery(ME)

  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.removeItem("library-token")
    client.resetStore()
    setPage("books")
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("library-token")
    if (savedToken) {
      setToken(savedToken)
      getMe()
    }
  }, []) // eslint-disable-line

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setPage={setPage} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} getMe={getMe}/>

      <Recommended
        show={page === "recommended"}
        userData={data}
        userLoading={loading}
        userError={error}
      />
    </div>
  )
}

export default App
