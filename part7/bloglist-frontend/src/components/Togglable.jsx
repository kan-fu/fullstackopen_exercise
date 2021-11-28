import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button, Box } from "@mui/material"
const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <Box sx={{ my: 2, p: 2, background: "white" }}>
      <Box style={hiddenWhenVisible}>
        <Button variant='outlined' onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible}>
        {children}
        <Button color='secondary' variant='outlined' onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </Box>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"
export default Togglable
