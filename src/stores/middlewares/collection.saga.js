import { call, put } from 'redux-saga/effects'
import { camelizeKeys } from 'humps'
import * as API from './api'
import * as ActionTypes from '../actions'

const NASA_COLLECTION_URL = '/search'

const filterVideoUrls = data => data.filter(url => url.includes('.mp4'))

const parseArrayObjectToArrayString = (data, key) =>
  data.reduce((array, item) => {
    array.push(item[key])
    return array
  }, [])

const sortVideoUrlsByPreDefinedOrder = data => {
  const theOrder = ['orig.mp4', 'large.mp4', 'medium.mp4', 'small.mp4', 'preview.mp4']
  const orderedResult = []
  theOrder.forEach(order => {
    const resultByOrder = data.filter(url => url.includes(order))
    if (resultByOrder.length !== 0) {
      orderedResult.push(resultByOrder[0])
    }
  })
  return orderedResult
}

export function* getCollection(action) {
  try {
    const { payload } = action
    const response = yield call(API.get, { url: NASA_COLLECTION_URL, params: payload })
    const {
      data: { collection }
    } = response
    yield put({
      type: ActionTypes.UPDATE_PAGINATION,
      payload: { currentRequestedPage: payload.page }
    })
    yield put({ type: ActionTypes.GET_COLLECTION_SUCCESS, payload: camelizeKeys(collection) })
  } catch (error) {
    if (error.response) {
      yield put({ type: ActionTypes.GET_COLLECTION_FAILURE, payload: error.response })
    } else {
      console.log(error)
    }
  }
}

export function* getVideoLink(action) {
  let { payload } = action
  try {
    if (payload.mediaType === 'video') {
      const response = yield call(API.get, { url: payload.getVideoLink, excludedBaseUrl: true })
      const { data } = response
      const videoLinks = filterVideoUrls(data)
      const sortedVideoLinks = sortVideoUrlsByPreDefinedOrder(videoLinks)
      payload = { ...payload, videoLink: sortedVideoLinks[0] || '' }
      yield put({ type: ActionTypes.UPDATE_CURRENT_SELECTED_ITEM, payload })
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: ActionTypes.UPDATE_CURRENT_SELECTED_ITEM, payload })
    } else {
      console.log(error)
    }
  }
}

const VIDEO_ASSET_URL = '/asset'

export function* getVideoUrlByVideoId(action) {
  let { payload } = action
  try {
    if (payload) {
      const endpoint = `${VIDEO_ASSET_URL}/${payload}`
      const response = yield call(API.get, { url: endpoint })
      const {
        data: { collection }
      } = response
      const videoLinks = filterVideoUrls(parseArrayObjectToArrayString(collection.items, 'href'))
      const sortedVideoLinks = sortVideoUrlsByPreDefinedOrder(videoLinks)
      payload = { videoLink: sortedVideoLinks[0] || '' }
      yield put({ type: ActionTypes.UPDATE_CURRENT_SELECTED_ITEM, payload })
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: ActionTypes.UPDATE_CURRENT_SELECTED_ITEM, payload })
    } else {
      console.log(error)
    }
  }
}
