import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import {createFilter} from '../reducers/filterReducer'

const Filter = (props) => {

    const dispatch = useDispatch()

  const handleChange = (event) => {
    let x = props.createFilter(event.target.value)
      
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {  
  createFilter
}

const ConnectionFilter = connect(
  null,
  mapDispatchToProps)(Filter)

export default ConnectionFilter