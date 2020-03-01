import React, { memo } from 'react'
import * as PropTypes from 'prop-types'

import './style.scss'
import { CollectionItem } from '../collection-item'

const CollectionList = ({ collections, renderFooter, playVideo }) => {
  return (
    <div className="collection-list">
      {collections.map(item => {
        return (
          <CollectionItem
            key={item.id}
            footer={renderFooter(item)}
            item={item}
            playVideo={playVideo}
          />
        )
      })}
    </div>
  )
}

CollectionList.defaultProps = {
  collections: [],
  playVideo: () => ({}),
  renderFooter: () => ({})
}

CollectionList.propTypes = {
  collections: PropTypes.array,
  renderFooter: PropTypes.func,
  playVideo: PropTypes.func,
}

export default memo(CollectionList)
