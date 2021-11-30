import React, { useState } from "react"
import BooksTable from "./BooksTable"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = ({ show }) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (!show | loading) {
    return null
  }
  if (error) {
    return `Error! ${error}`
  }

  const books = data.allBooks
  const booksToShow = genreFilter
    ? books.filter((book) => book.genres.includes(genreFilter))
    : books
  return (
    <div>
      <h2>books</h2>
      <BooksTable booksToShow={booksToShow} />

      <div>
        {Array.from(new Set(books.map((book) => book.genres).flat())).map(
          (genre) => (
            <button key={genre} onClick={() => setGenreFilter(genre)}>
              {genre}
            </button>
          )
        )}
        <button onClick={() => setGenreFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
