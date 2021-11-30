import React, { useState } from "react"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"

const SetBirthyear = ({ authors }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ALL_AUTHORS],
  })
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    await editAuthor({ variables: { name, setBornTo: +born } })
    setBorn("")
  }
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear
