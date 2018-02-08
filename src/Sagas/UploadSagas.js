import {call, put} from 'redux-saga/effects'
import UploadActions from '../Redux/UploadRedux'

export function * uploadContent (api, { post }) {
  const response = yield call(api.uploadPost, post)

  if (response.ok) {
    yield put(UploadActions.uploadSuccess())
  } else {
    yield put(UploadActions.uploadFailure(response.problem))
  }
}

export function * uploadComment (api, { comment }) {
  const response = yield call(api.uploadComment, comment)

  if (response.ok) {
    yield put(UploadActions.uploadSuccess())
  } else {
    yield put(UploadActions.uploadFailure(response.problem))
  }
}
