import { all, takeLatest } from 'redux-saga/effects'
import { getCollection, getVideoLink, getVideoUrlByVideoId } from './collection.saga'
import * as ActionTypes from '../actions'

function* watchSources() {
  yield takeLatest(ActionTypes.GET_COLLECTION_REQUEST, getCollection)
  yield takeLatest(ActionTypes.GET_VIDEO_LINK_REQUEST, getVideoLink)
  yield takeLatest(ActionTypes.GET_VIDEO_URL_BY_VIDEO_ID_REQUEST, getVideoUrlByVideoId)
}

export default function* rootSaga() {
  yield all([watchSources()])
}
