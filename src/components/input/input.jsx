import React, { memo } from 'react'
import * as PropTypes from 'prop-types'

import './style.scss'

const Input = ({ value, onChange, label, type, required, options, disabled }) => {
  const renderElement = () => {
    switch (type) {
      case 'input':
        return (
          <input
            className="input-field"
            disabled={disabled}
            onChange={event => onChange(event.target.value)}
            type="text"
            value={value}
          />
        )
      case 'textarea':
        return (
          <textarea
            className="input-field"
            disabled={disabled}
            onChange={event => onChange(event.target.value)}
            value={value}
          />
        )
      case 'select':
        return (
          <select
            className="input-field"
            disabled={disabled}
            onChange={event => onChange(event.target.value)}
          >
            {options.length !== 0 &&
              options.map((option) => {
                return (
                  <option key={`${option}`} value={option}>
                    {value === option ? value : option}
                  </option>
                )
              })}
          </select>
        )
      default:
        return null
    }
  }
  return (
    <label className="input-block">
      <span className="input-label">
        {label} {required && <span className="input-required">*</span>}
      </span>
      {renderElement()}
    </label>
  )
}

Input.defaultProps = {
  onChange: () => ({}),
  value: '',
  label: '',
  type: 'input',
  required: false,
  options: [],
  disabled: false
}

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['input', 'textarea', 'select']),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array
}

export default memo(Input)
