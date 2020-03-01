export const GET_COLLECTION_REQUEST = 'GET_COLLECTION_REQUEST'
export const GET_COLLECTION_SUCCESS = 'GET_COLLECTION_SUCCESS'
export const GET_COLLECTION_FAILURE = 'GET_COLLECTION_FAILURE'

export const getCollection = data => ({
  type: GET_COLLECTION_REQUEST,
  payload: data
})

export const RESET_COLLECTION_ITEMS = 'RESET_COLLECTION_ITEMS'
export const resetCollectionItems = () => ({
  type: RESET_COLLECTION_ITEMS
})

export const INIT_MY_COLLECTION = 'INIT_MY_COLLECTION'
export const initMyCollection = data => ({
  type: INIT_MY_COLLECTION,
  payload: data
})

export const UPDATE_CURRENT_SELECTED_ITEM = 'UPDATE_CURRENT_SELECTED_ITEM'
export const updateCurrentSelectedItem = data => ({
  type: UPDATE_CURRENT_SELECTED_ITEM,
  payload: data
})

export const RESET_CURRENT_SELECTED_ITEM = 'RESET_CURRENT_SELECTED_ITEM'
export const resetCurrentSelectedItem = data => ({
  type: RESET_CURRENT_SELECTED_ITEM,
  payload: data
})

export const GET_VIDEO_LINK_REQUEST = 'GET_VIDEO_LINK_REQUEST'
export const getVideoLink = data => ({
  type: GET_VIDEO_LINK_REQUEST,
  payload: data
})

export const ADD_TO_MY_COLLECTION = 'ADD_TO_MY_COLLECTION'
export const addToMyCollection = data => ({
  type: ADD_TO_MY_COLLECTION,
  payload: data
})

export const DELETE_FROM_MY_COLLECTION = 'DELETE_FROM_MY_COLLECTION'
export const deleteFromMyCollection = data => ({
  type: DELETE_FROM_MY_COLLECTION,
  payload: data
})

export const TOGGLE_FAVORITE_ITEM = 'TOGGLE_FAVORITE_ITEM'
export const toggleFavoriteItem = data => ({
  type: TOGGLE_FAVORITE_ITEM,
  payload: data
})

export const EDIT_MY_COLLECTION_ITEM = 'EDIT_MY_COLLECTION_ITEM'
export const editMyCollectionItem = data => ({
  type: EDIT_MY_COLLECTION_ITEM,
  payload: data
})

export const GET_VIDEO_URL_BY_VIDEO_ID_REQUEST = 'GET_VIDEO_URL_BY_VIDEO_ID_REQUEST'
export const getVideoUrlByVideoId = data => ({
  type: GET_VIDEO_URL_BY_VIDEO_ID_REQUEST,
  payload: data
})

export const UPDATE_CURRENT_SEARCH_VALUE = 'UPDATE_CURRENT_SEARCH_VALUE'
export const updateCurrentSearchValue = data => ({
  type: UPDATE_CURRENT_SEARCH_VALUE,
  payload: data
})

export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'
export const updatePagination = data => ({
  type: UPDATE_PAGINATION,
  payload: data
})
