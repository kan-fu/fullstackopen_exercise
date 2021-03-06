import React from "react"
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import SetBirthyear from "./SetBirthyear"

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (!props.show || loading) {
    return null
  }
  if (error) {
    return `Error! ${error}`
  }

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthyear authors={authors} />
    </div>
  )
}

export default Authors
