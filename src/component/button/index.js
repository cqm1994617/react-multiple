import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const Button = ({children, onPress}) => (
  <div className="button" onClick={onPress}>
    {children}
  </div>
)

Button.propTypes = {
  onPress: PropTypes.func,
}

export default Button
