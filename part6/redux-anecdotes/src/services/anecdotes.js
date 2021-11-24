import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const obj = { content, votes: 0 }
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const updateOne = async (id, updatedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedObj)
  return response.data
} 

const anecdoteService = { getAll, createNew, updateOne }
export default anecdoteService
