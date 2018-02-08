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
    yield put(UploadActions.uploadCommentSuccess())
  } else {
    yield put(UploadActions.uploadCommentFailure(response.problem))
  }
}

export function * editComment (api, { comment }) {
  const response = yield call(api.editComment, comment)

  if (response.ok) {
    yield put(UploadActions.editCommentSuccess())
  } else {
    yield put(UploadActions.editCommentFailure(response.problem))
  }
}

export function * deleteComment (api, { id }) {
  const response = yield call(api.deleteComment, id)

  if (response.ok) {
    yield put(UploadActions.deleteCommentSuccess())
  } else {
    yield put(UploadActions.deleteCommentFailure(response.problem))
  }
}

export function * editPost (api, { post }) {
  const response = yield call(api.editPost, post)

  if (response.ok) {
    yield put(UploadActions.editPostSuccess())
  } else {
    yield put(UploadActions.editCommentFailure(response.problem))
  }
}

export function * deletePost (api, { id }) {
  const response = yield call(api.deletePost, id)

  if (response.ok) {
    yield put(UploadActions.deletePostSuccess())
  } else {
    yield put(UploadActions.deletePostFailure(response.problem))
  }
}
