import React, { memo } from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

import './style.scss'

const Button = ({ icon, type, size, onClick, children, fullWidth, className, disabled }) => {
  const buttonClassName = classNames({
    [`${className} btn btn-${type} btn-${size}`]: true,
    'btn-full': fullWidth,
    'btn-icon-only': !children
  })
  return (
    <button className={buttonClassName} disabled={disabled} onClick={onClick} type="button">
      {icon}<span className='btn-label'>{children}</span>
    </button>
  )
}

Button.defaultProps = {
  className: '',
  children: null,
  icon: null,
  onClick: () => ({}),
  size: 'sm',
  fullWidth: false,
  type: 'primary',
  disabled: false
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'link', 'default'])
}

export default memo(Button)
