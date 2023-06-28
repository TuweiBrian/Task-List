import React from 'react'
import PropTypes from 'prop-types'

function Button({text,color,onAdd}) {
    
  return (
    <div>
      <button onClick={onAdd} className='btn' style={{backgroundColor:color}}> {text} </button>
    </div>
  )
}
Button.defaultProps = {
    text:'Add',
    color: 'green'
}
Button.propTypes = {
    text:PropTypes.string,
    color: PropTypes.string
}

export default Button
