import * as ActionType from '../actions'

const initState = {
  allData: {},
  collectionItems: [],
  myCollection: [],
  myCollectionKeyById: {},
  currentSelectedItem: {},
  pagination: {
    currentPage: 1,
    currentRequestedPage: 1,
  },
  loading: false,
  errors: null,
  currentSearchValue: ''
}

const convertDate = dateString => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return `${new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))}`
}

const parseArrayToMapKeyById = sources => {
  return sources.reduce((map, obj) => {
    // eslint-disable-next-line no-param-reassign
    map[obj.id] = obj
    return map
  }, {})
}

const parseCollectionItems = data => {
  return data
    .map(item => {
      let previewImageUrl = null
      if (item.links && item.links[0]) {
        previewImageUrl = item.links[0].href
      }
      if (item.data && item.data[0]) {
        const { nasaId, description, title, dateCreated, photographer, mediaType } = item.data[0]
        return {
          createdDate: convertDate(dateCreated),
          origCreatedDate: dateCreated,
          previewImageUrl,
          getVideoLink: mediaType === 'video' ? item.href : null,
          description,
          title,
          photographer,
          id: nasaId,
          mediaType
        }
      }
      return null
    })
    .filter(item => item)
}

export default (state = initState, action) => {
  const { payload } = action
  let tmpPayload
  let tmpMyCollection
  let tmpMyCollectionKeyById
  switch (action.type) {
    case ActionType.GET_COLLECTION_REQUEST:
    case ActionType.GET_VIDEO_LINK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionType.UPDATE_PAGINATION:
        return {
          ...state,
          pagination: {
            ...state.pagination,
            ...payload
          }
        }
    case ActionType.GET_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        allData: payload,
        collectionItems: parseCollectionItems(payload.items)
      }
    case ActionType.INIT_MY_COLLECTION:
      return {
        ...state,
        myCollection: payload,
        myCollectionKeyById: parseArrayToMapKeyById(payload)
      }
    case ActionType.ADD_TO_MY_COLLECTION:
      tmpPayload = { ...payload, isFavorite: false }
      // check item exist
      if (!state.myCollectionKeyById[tmpPayload.id]) {
        tmpMyCollection = [...state.myCollection, tmpPayload]
        return {
          ...state,
          myCollection: tmpMyCollection,
          myCollectionKeyById: {
            ...state.myCollectionKeyById,
            [tmpPayload.id]: tmpPayload
          }
        }
      }
      return state
    case ActionType.EDIT_MY_COLLECTION_ITEM:
      tmpMyCollectionKeyById = {
        ...state.myCollectionKeyById,
        [payload.id]: payload
      }
      return {
        ...state,
        myCollectionKeyById: tmpMyCollectionKeyById,
        myCollection: Object.values(tmpMyCollectionKeyById)
      }
    case ActionType.DELETE_FROM_MY_COLLECTION:
      tmpMyCollection = state.myCollection.filter(item => item.id !== payload.id)
      tmpMyCollectionKeyById = { ...state.myCollectionKeyById }
      delete tmpMyCollectionKeyById[payload.id]
      return {
        ...state,
        myCollection: tmpMyCollection,
        myCollectionKeyById: tmpMyCollectionKeyById
      }
    case ActionType.GET_COLLECTION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload
      }
    case ActionType.RESET_COLLECTION_ITEMS: {
      return {
        ...state,
        collectionItems: [],
        allData: {}
      }
    }
    case ActionType.UPDATE_CURRENT_SELECTED_ITEM: {
      return {
        ...state,
        currentSelectedItem: payload,
        loading: false
      }
    }
    case ActionType.UPDATE_CURRENT_SEARCH_VALUE:
      return {
        ...state,
        currentSearchValue: payload
      }
    case ActionType.RESET_CURRENT_SELECTED_ITEM:
      return {
        ...state,
        currentSelectedItem: {}
      }
    default:
      return state
  }
}
