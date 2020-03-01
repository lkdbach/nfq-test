import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const Loading = ({ showLoading }) => {
  return (
    <>
      {showLoading && (
        <div className="loading-container">
          <div className="lds-roller">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
          </div>
        </div>
      )}
    </>
  )
}

Loading.propTypes = {
  showLoading: PropTypes.bool
}

Loading.defaultProps = {
  showLoading: false
}

export default Loading
