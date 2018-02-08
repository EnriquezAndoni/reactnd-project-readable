import { call, put } from 'redux-saga/effects'
import RetrieveActions from '../Redux/RetrieveRedux'
import Globals from '../Utils/Globals'

/**
 * @description Load the new language catalog
 * @param {object} api - The connection with the api
 */
export function * retrieve (api, { parameters }) {
  let response

  switch (parameters.call) {
    case Globals.post:
      response = yield call(api.getCategoryPosts, parameters.category)
      if (response.ok) {
        yield put(RetrieveActions.retrieveData(response.data))
        yield put(RetrieveActions.retrieveSuccess())
      } else {
        yield put(RetrieveActions.retrieveFailure(response.problem))
      }
      break

    default:
      break
  }

  const categories = yield call(api.getCategories)
  const posts = yield call(api.getAllPosts)
  yield put(RetrieveActions.retrieveHomeSuccess(categories.data, posts.data))
}

export function * retrieveHome (api) {
  const categories = yield call(api.getCategories)
  const posts = yield call(api.getAllPosts)

  if (categories.ok && posts.ok) {
    yield put(RetrieveActions.retrieveHomeSuccess(categories.data, posts.data))
  } else {
    yield put(RetrieveActions.retrieveHomeFailure(categories.problem, posts.problem))
  }
}

export function * retrieveDetail (api, { id }) {
  const post = yield call(api.getPost, id)
  const comments = yield call(api.getPostComments, id)

  if (post.ok && comments.ok) {
    yield put(RetrieveActions.retrieveDetailSuccess(post.data, comments.data))
  } else {
    yield put(RetrieveActions.retrieveDetailFailure(post.problem, comments.problem))
  }

  const categories = yield call(api.getCategories)
  const posts = yield call(api.getAllPosts)
  yield put(RetrieveActions.retrieveHomeSuccess(categories.data, posts.data))
}
