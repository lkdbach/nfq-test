import React, { memo } from 'react'
import * as PropTypes from 'prop-types'
import { Input } from '../input'
import { Modal } from '../modal'

const CollectionItemDetailModal = ({
  isOpen,
  closeModal,
  item,
  title,
  footer,
  disableEdit,
  onChange
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <div className="popup-content">
        <div className="popup-item">
          <Input
            disabled={disableEdit}
            label="Title"
            onChange={value => onChange({ ...item, title: value })}
            type="input"
            value={item.title}
          />
        </div>
        <div className="popup-item">
          <Input
            disabled={disableEdit}
            label="Description"
            onChange={value => onChange({ ...item, description: value })}
            type="textarea"
            value={item.description}
          />
        </div>
        <div className="popup-item">
          <Input
            disabled={disableEdit}
            label="Type"
            onChange={value => onChange({ ...item, mediaType: value })}
            options={[item.mediaType]}
            type="select"
            value={item.mediaType}
          />
        </div>
        <div className="popup-item">
          <Input
            disabled={disableEdit}
            label="Link preview image url"
            onChange={value => onChange({ ...item, previewImageUrl: value })}
            required
            type="textarea"
            value={item.previewImageUrl}
          />
        </div>
        <div className="popup-item">
          <Input
            disabled={disableEdit}
            label="Link file url"
            onChange={value => onChange({ ...item, videoLink: value })}
            required
            type="textarea"
            value={item.videoLink}
          />
        </div>
        {footer && <div className="popup-item">{footer}</div>}
      </div>
    </Modal>
  )
}

CollectionItemDetailModal.defaultProps = {
  footer: null,
  disableEdit: false,
  onChange: () => ({})
}

CollectionItemDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  disableEdit: PropTypes.bool,
  item: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string.isRequired,
  footer: PropTypes.node
}

export default memo(CollectionItemDetailModal)
