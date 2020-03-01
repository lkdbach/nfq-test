import React, { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/search.style.scss'

import {
  BackIcon,
  AddIcon,
  Button,
  CheckIcon,
  CollectionList,
  CollectionItemDetailModal,
  Loading,
  Pagination
} from '../components'
import { useDebounce, useInput } from '../hooks'
import {
  addToMyCollection,
  getCollection,
  resetCollectionItems,
  resetCurrentSelectedItem,
  updateCurrentSelectedItem,
  getVideoLink,
  updateCurrentSearchValue,
  updatePagination
} from '../stores/actions'

const SearchPage = ({
  history,
  getCollection,
  collectionItems,
  addToMyCollection,
  totalItems,
  updateCurrentSelectedItem,
  currentSelectedItem,
  resetCurrentSelectedItem,
  getVideoLink,
  myCollectionKeyById,
  loading,
  updateCurrentSearchValue,
  currentSearchValue,
  updatePagination,
  currentPage,
  currentRequestedPage
}) => {
  const ITEM_PER_PAGE = 10
  const { value: searchValue, setValue: setSearchValue } = useInput('')
  const [paginatedCollectionItems, setPaginatedCollectionItems] = useState(collectionItems)
  const [showModal, setShowModal] = useState(false)
  const searchDebounce = useDebounce(searchValue, 800)

  const _findNextRequestPage = currentPage =>
    currentPage % 10 === 0 ? Math.floor(currentPage / 10) : Math.floor(currentPage / 10) + 1

  // handle request more data
  useEffect(() => {
    const nextRequestPage = _findNextRequestPage(currentPage)
    if (nextRequestPage !== currentRequestedPage) {
      getCollection({ q: searchDebounce, page: nextRequestPage })
    }
  }, [currentPage, currentRequestedPage, getCollection, searchDebounce])

  // handle pagination
  useEffect(() => {
      const startIndex = (currentPage % 10 - 1) * ITEM_PER_PAGE
      const tmpCollectionItems = [...collectionItems]
      setPaginatedCollectionItems(tmpCollectionItems.splice(startIndex, ITEM_PER_PAGE))
  }, [collectionItems, currentPage])

  // call api to search, use debounce to avoid multiple api requests
  useEffect(() => {
    if (currentSearchValue !== searchDebounce && searchDebounce !== '') {
      getCollection({ q: searchDebounce, page: 1 })
      updateCurrentSearchValue(searchDebounce)
    }
  }, [searchDebounce, getCollection, updateCurrentSearchValue, currentSearchValue])

  // sync local search value with application search value
  useEffect(() => {
    if (currentSearchValue !== '') {
      setSearchValue(currentSearchValue)
    }
  }, [currentSearchValue, setSearchValue])

  const _goToCollectionPage = () => {
    history.push('/')
  }

  const _handleOpenAddModal = item => {
    setShowModal(true)
    if (item.mediaType === 'video') {
      getVideoLink(item)
    } else {
      updateCurrentSelectedItem(item)
    }
  }

  const _handleCloseModal = () => {
    setShowModal(false)
    resetCurrentSelectedItem()
  }

  const _handlePlayVideo = item => {
    if (myCollectionKeyById[item.id]) {
      // get item from myCollection to have videoUrl
      updateCurrentSelectedItem(myCollectionKeyById[item.id])
    } else {
      getVideoLink(item)
    }
    history.push(`/video/${item.id}`)
  }

  const _handleAddToCollection = () => {
    addToMyCollection(currentSelectedItem)
    resetCurrentSelectedItem()
    setShowModal(false)
  }

  const _renderFooter = item => {
    if (myCollectionKeyById[item.id]) {
      return (
        <Button className="add-collection" disabled fullWidth size="lg" type="default">
          Added
        </Button>
      )
    }
    return (
      <Button
        className="add-collection"
        fullWidth
        icon={<AddIcon color="#8F8F93" />}
        onClick={() => _handleOpenAddModal(item)}
        size="lg"
        type="default"
      >
        Add to NASA collection
      </Button>
    )
  }

  return (
    <div>
      <div>
        <Button
          icon={<BackIcon color="#784CC0" height="14px" viewBox="0 0 10 14" width="10px" />}
          onClick={_goToCollectionPage}
          size="sm"
          type="link"
        >
          Back To Collection
        </Button>
      </div>
      <h1>Search from NASA</h1>
      <input
        className="search-input"
        disabled={loading}
        onChange={event => setSearchValue(event.target.value)}
        placeholder="Type something to search..."
        type="text"
        value={searchValue}
      />
      {totalItems !== null && (
        <div className="row-space">
          <p className="text-small">
            {totalItems} result for &rdquo;{currentSearchValue}&rdquo;
          </p>
          <Pagination
            currentPage={currentPage}
            itemPerPage={ITEM_PER_PAGE}
            onChangePage={newPage => updatePagination({ currentPage: newPage })}
            totalRecords={totalItems}
          />
        </div>
      )}

      <CollectionList
        collections={paginatedCollectionItems}
        playVideo={_handlePlayVideo}
        renderFooter={_renderFooter}
      />

      <CollectionItemDetailModal
        closeModal={_handleCloseModal}
        disableEdit
        footer={
          <Button
            icon={<CheckIcon color="#FFFFFF" height="20px" viewBox="0 0 20 20" width="20px" />}
            onClick={() => _handleAddToCollection()}
            size="lg"
          >
            Add to collection
          </Button>
        }
        isOpen={showModal}
        item={currentSelectedItem}
        title="Add to collection"
      />

      <Loading showLoading={loading} />
    </div>
  )
}

SearchPage.defaultProps = {
  collectionItems: [],
  totalItems: null,
  loading: false
}

SearchPage.propTypes = {
  history: PropTypes.object.isRequired,
  myCollectionKeyById: PropTypes.object.isRequired,
  currentSelectedItem: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  getVideoLink: PropTypes.func.isRequired,
  updatePagination: PropTypes.func.isRequired,
  resetCurrentSelectedItem: PropTypes.func.isRequired,
  updateCurrentSearchValue: PropTypes.func.isRequired,
  updateCurrentSelectedItem: PropTypes.func.isRequired,
  addToMyCollection: PropTypes.func.isRequired,
  collectionItems: PropTypes.array,
  currentPage: PropTypes.number.isRequired,
  currentRequestedPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number,
  currentSearchValue: PropTypes.string.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => {
  const {
    collectionItems,
    currentSelectedItem,
    myCollectionKeyById,
    loading,
    currentSearchValue,
    pagination: { currentPage, currentRequestedPage }
  } = state.collection
  const totalItems =
    state.collection.allData && state.collection.allData.metadata
      ? state.collection.allData.metadata.totalHits
      : null
  return {
    currentPage,
    totalItems,
    collectionItems,
    currentSelectedItem,
    currentRequestedPage,
    myCollectionKeyById,
    loading,
    currentSearchValue
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(
    {
      getCollection,
      resetCollectionItems,
      addToMyCollection,
      updateCurrentSelectedItem,
      resetCurrentSelectedItem,
      getVideoLink,
      updateCurrentSearchValue,
      updatePagination
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
