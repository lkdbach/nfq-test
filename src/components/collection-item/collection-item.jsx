import React, { memo } from 'react'
import * as PropTypes from 'prop-types'
import playIcon from '../../assets/icons/play.svg'

import './style.scss'

const CollectionItem = ({
  item,
  footer,
  playVideo
}) => {
  return (
    <div className="collection-item">
      <div>
        {item.previewImageUrl && (
          <div className="item-preview">
            <img alt="NASA Fail" className="item-image" src={item.previewImageUrl} />
            {item.mediaType === 'video' && (
              <div className="play-button-container" onClick={() => playVideo(item)}>
                <div className="play-background">
                  <img alt="play" src={playIcon} />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="row-space">
          <p className="text-helper">{item.author}</p>
          <p className="text-helper">{item.postDate}</p>
        </div>
        <h3 className="title-text">{item.title}</h3>
        <p className="description-text">{item.description}</p>
      </div>
      {footer}
    </div>
  )
}

CollectionItem.defaultProps = {
  playVideo: () => ({}),
  footer: null,
  item: {}
}

CollectionItem.propTypes = {
  item: PropTypes.object,
  playVideo: PropTypes.func,
  footer: PropTypes.node
}

export default memo(CollectionItem)
