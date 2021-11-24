import React from "react"
import { connect } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterText = event.target.value
    // dispatch(filter(filterText))
    props.filter(filterText)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filter
}

export default connect(null, mapDispatchToProps)(Filter)
