let timer = null;
export const setNotification = (message, seconds) => {
  return (dispatch) => {
    clearTimeout(timer)
    dispatch({
      type: "SET",
      message,
    })
    timer = setTimeout(()=>
      dispatch({
        type: "CLEAR",
      }),
      seconds * 1000
    )
  }
}

export const hide = () => ({
  type: "CLEAR",
  data: {},
})

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET":
      return action.message
    case "CLEAR":
      return null
    default:
      return state
  }
}

export default reducer
