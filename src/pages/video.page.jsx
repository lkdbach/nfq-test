import React, { useEffect } from 'react'
import * as PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CloseIcon } from '../components/icons'
import {
  updateCurrentSelectedItem,
  resetCurrentSelectedItem,
  getVideoUrlByVideoId
} from '../stores/actions'
import './styles/video.style.scss'
import { useLocalStorage, useWindowUnloadEffect } from '../hooks'
import { CURRENT_SELECTED_ITEM_KEY } from '../commons/constants'

const VideoPage = ({
  updateCurrentSelectedItem,
  currentSelectedItem,
  history,
  loading,
  match,
  resetCurrentSelectedItem,
  getVideoUrlByVideoId
}) => {
  const [localSelectedItem, setLocalSelectedItem] = useLocalStorage(CURRENT_SELECTED_ITEM_KEY, {})

  // save currentSelectedItem to local storage to use when refresh video page
  useWindowUnloadEffect(() => setLocalSelectedItem(currentSelectedItem), true)

  // this effect handle for item that do not belong to myCollection
  useEffect(() => {
    // refresh page, update current selected item from local storage data
    if (!currentSelectedItem.title && !loading && localSelectedItem.id === match.params.videoId) {
      updateCurrentSelectedItem(localSelectedItem)
    }
    // paste video link to another web browser, request videoUrl by videoId
    if (!currentSelectedItem.title && !loading && localSelectedItem.id !== match.params.videoId) {
      getVideoUrlByVideoId(match.params.videoId)
    }
    return () => resetCurrentSelectedItem()
  }, [])

  const _handleGoBack = () => {
    history.goBack()
  }

  return (
    <div className="video-container">
      <div className="video-dialog">
        <div className="video-header">
          <h3>{currentSelectedItem.title}</h3>
          <div className="back-btn" onClick={_handleGoBack}>
            <CloseIcon color="#FFFFFF" />
          </div>
        </div>

        {currentSelectedItem.videoLink && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video autoPlay className="video-player" controls>
            <source src={currentSelectedItem.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  )
}

VideoPage.defaultProps = {}

VideoPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentSelectedItem: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  updateCurrentSelectedItem: PropTypes.func.isRequired,
  getVideoUrlByVideoId: PropTypes.func.isRequired,
  resetCurrentSelectedItem: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentSelectedItem: state.collection.currentSelectedItem,
  loading: state.collection.loading
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(
    {
      updateCurrentSelectedItem,
      resetCurrentSelectedItem,
      getVideoUrlByVideoId
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage)
