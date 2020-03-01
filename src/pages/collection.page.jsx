import React, { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  AddIcon,
  Button,
  CheckIcon,
  CollectionItemDetailModal,
  CollectionList,
  HeartFilledIcon,
  HeartIcon,
  Input,
  PenIcon,
  TrashBinIcon
} from '../components'
import {
  deleteFromMyCollection,
  editMyCollectionItem,
  resetCurrentSelectedItem,
  toggleFavoriteItem,
  updateCurrentSelectedItem
} from '../stores/actions'

import './styles/collection.style.scss'
import {
  DATE,
  EMPTY,
  FAVORITE,
  FILTER_ITEMS,
  IMAGE,
  SORT_ITEMS,
  TITLE,
  VIDEO
} from '../commons/constants'

const CollectionPage = ({
  history,
  myCollection,
  deleteFromMyCollection,
  currentSelectedItem,
  updateCurrentSelectedItem,
  resetCurrentSelectedItem,
  editMyCollectionItem
}) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  const [filterValue, setFilterValue] = useState(EMPTY)
  const [sortValue, setSortValue] = useState(EMPTY)
  const [myCollectionState, setMyCollectionState] = useState(myCollection)

  useEffect(() => {
    setCurrentItem(currentSelectedItem)
  }, [currentSelectedItem, setCurrentItem])

  useEffect(() => {
    setMyCollectionState(myCollection)
  }, [setMyCollectionState, myCollection])

  useEffect(() => {
    let tmpMyCollection = [...myCollection]
    switch (sortValue) {
      case TITLE:
        tmpMyCollection.sort((a, b) => {
          const x = a.title.toLowerCase()
          const y = b.title.toLowerCase()
          if (x < y) {
            return -1
          }
          if (x > y) {
            return 1
          }
          return 0
        })
        break
      case DATE:
        tmpMyCollection.sort((a, b) => new Date(b.origCreatedDate) - new Date(a.origCreatedDate))
        break
      default:
        break
    }
    switch (filterValue) {
      case FAVORITE:
        tmpMyCollection = tmpMyCollection.filter(item => item.isFavorite)
        break
      case VIDEO:
        tmpMyCollection = tmpMyCollection.filter(item => item.mediaType === 'video')
        break
      case IMAGE:
        tmpMyCollection = tmpMyCollection.filter(item => item.mediaType === 'image')
        break
      default:
        break
    }
    setMyCollectionState(tmpMyCollection)
  }, [sortValue, filterValue, myCollection])

  const _goToSearchPage = () => {
    history.push('/search')
  }

  const _handleSaveItem = () => {
    editMyCollectionItem(currentItem)
    setShowEditModal(false)
  }

  const _renderModalFooter = () => {
    return (
      <Button
        icon={<CheckIcon color="#FFFFFF" height="20px" viewBox="0 0 20 20" width="20px" />}
        onClick={_handleSaveItem}
        size="lg"
      >
        Save
      </Button>
    )
  }

  const _handleCloseModal = () => {
    setShowEditModal(false)
    resetCurrentSelectedItem()
  }

  const _handleEditItem = item => {
    setShowEditModal(true)
    updateCurrentSelectedItem(item)
  }

  const _handlePlayVideo = item => {
    updateCurrentSelectedItem(item)
    history.push(`/video/${item.id}`)
  }

  const _renderFooter = item => (
    <div className="action-group">
      <Button
        className="action-item"
        icon={
          item.isFavorite ? (
            <HeartFilledIcon color="#E54D42" viewBox="0 0 22 22" />
          ) : (
            <HeartIcon viewBox="0 0 22 22" />
          )
        }
        onClick={() => editMyCollectionItem({ ...item, isFavorite: !item.isFavorite })}
        size="lg"
        type="default"
      />
      <Button
        className="action-item"
        icon={<TrashBinIcon viewBox="0 0 20 20" />}
        onClick={() => deleteFromMyCollection(item)}
        size="lg"
        type="default"
      />
      <Button
        className="action-item"
        icon={<PenIcon viewBox="0 0 20 20" />}
        onClick={() => _handleEditItem(item)}
        size="lg"
        type="default"
      />
    </div>
  )

  return (
    <div>
      <div className="row-space">
        <h1 className="collection-page-title">NASA Collection</h1>
        <Button icon={<AddIcon color="#FFFFFF" />} onClick={_goToSearchPage} size="lg">
          Add new collection
        </Button>
      </div>
      <div className="filter-sort">
        <div className="filter-sort-item">
          <Input
            label="Filter"
            onChange={value => setFilterValue(value)}
            options={FILTER_ITEMS}
            type="select"
            value={filterValue}
          />
        </div>
        <div className="filter-sort-item">
          <Input
            label="Sort"
            onChange={value => setSortValue(value)}
            options={SORT_ITEMS}
            type="select"
            value={sortValue}
          />
        </div>
      </div>
      <CollectionList
        collections={myCollectionState}
        playVideo={_handlePlayVideo}
        renderFooter={_renderFooter}
      />
      <CollectionItemDetailModal
        closeModal={_handleCloseModal}
        footer={_renderModalFooter()}
        isOpen={showEditModal}
        item={currentItem}
        onChange={setCurrentItem}
        title="Edit Collection"
      />
    </div>
  )
}

const mapStateToProps = state => {
  const { myCollection, currentSelectedItem, myCollectionKeyById } = state.collection
  return {
    myCollection,
    currentSelectedItem,
    myCollectionKeyById
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(
    {
      deleteFromMyCollection,
      toggleFavoriteItem,
      updateCurrentSelectedItem,
      resetCurrentSelectedItem,
      editMyCollectionItem
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)

CollectionPage.defaultProps = {
  myCollection: []
}

CollectionPage.propTypes = {
  history: PropTypes.object.isRequired,
  currentSelectedItem: PropTypes.object.isRequired,
  deleteFromMyCollection: PropTypes.func.isRequired,
  updateCurrentSelectedItem: PropTypes.func.isRequired,
  editMyCollectionItem: PropTypes.func.isRequired,
  resetCurrentSelectedItem: PropTypes.func.isRequired,
  myCollection: PropTypes.array
}
