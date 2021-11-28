import blogService from "../services/blogs"
import loginService from "../services/login"

import { setNotificationAction } from "../reducers/notificationReducer"

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload
    case "LOGOUT_USER":
      return null
    default:
      return state
  }
}

export const loginUserAction = (e) => {
  return async (dispatch) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      dispatch({
        type: "LOGIN_USER",
        payload: loggedUser,
      })
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
      e.target.username.value = ""
      e.target.password.value = ""
    } catch (error) {
      dispatch(
        setNotificationAction("wrong username or password", "warning", 3)
      )
    }
  }
}

export const logoutUserAction = () => {
  window.localStorage.removeItem("loggedUser")
  return {
    type: "LOGOUT_USER",
  }
}

export const reLoginAction = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: "LOGIN_USER",
        payload: loggedUser,
      })
    }
  }
}

export default reducer
