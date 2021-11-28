import notificationReducer from "./reducers/notificationReducer"
import blogsReducer from "./reducers/blogsReducer"
import loginReducer from "./reducers/loginReducer"
import usersReducer from "./reducers/usersReducer"

import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const reducer = {
  user: loginReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
  users: usersReducer,
}

export default createStore(
  combineReducers(reducer),
  composeWithDevTools(applyMiddleware(thunk))
)
