import React from 'react'
import Button from './Button'
import { PropTypes } from 'prop-types'
import { useLocation } from 'react-router-dom'

function Header({title,onAdd,showAdd}) {
  const location = useLocation()
  return (
    <header className='header'>
        <h1>{title}</h1>
      {location.pathname ==='/' && <Button onAdd={onAdd} color={showAdd ? 'red' :'green' } text={showAdd ? 'Close' : 'Add'}/>}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}
Header.propTypes = {
    title: PropTypes.string
}

export default Header
