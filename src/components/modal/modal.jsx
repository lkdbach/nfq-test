import React, { memo } from 'react'
import * as PropTypes from 'prop-types'

import './style.scss'
import { CloseIcon } from '../icons'

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <div className={`modal ${isOpen && 'open'}`}>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-dialog" tabIndex={-1}>
        <div className="modal-body">
          <div className="modal-header">
            <h3>{title}</h3>
            <div onClick={onClose}>
              <CloseIcon className='modal-close-icon' height="20px" viewBox='0 0 22 22' width="20px"/>
            </div>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  children: null,
  isOpen: false,
  onClose: () => ({}),
  title: ''
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string
}

export default memo(Modal)
