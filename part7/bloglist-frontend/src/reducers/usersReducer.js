import userService from "../services/users"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.payload
    default:
      return state
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: "SET_USERS",
      payload: users,
    })
  }
}

export default reducer
