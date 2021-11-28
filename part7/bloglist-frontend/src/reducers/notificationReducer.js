export const clear = () => ({
  type: "CLEAR_NOTIFICATION",
})

let timeoutId

export const setNotificationAction = (message, variant, time) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        message,
        variant,
      },
    })
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => dispatch(clear()), time * 1000)
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case "CLEAR_NOTIFICATION":
      return null
    case "SET_NOTIFICATION":
      return action.payload
    default:
      return state
  }
}

export default reducer
