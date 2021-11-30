import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

import BooksTable from "./BooksTable"

const Recommended = ({ show, userData, userError, userLoading }) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  const favoriteGenre = userData?.me?.favoriteGenre
  
  useEffect(() => {
    getBooks({ variables: { genre: favoriteGenre } })
  }, [favoriteGenre]) // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data]) // eslint-disable-line

  if (!show || userLoading) {
    return null
  }

  if (userError) {
    return `Error! ${userError}`
  }

  // const books = bookData.allBooks
  // const favoriteGenre = userData?.me?.favoriteGenre
  // console.log(favoriteGenre)
  // getBooks({ variables: { genre: favoriteGenre } })
  return (
    <div>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <BooksTable booksToShow={books} />
    </div>
  )
}

export default Recommended
