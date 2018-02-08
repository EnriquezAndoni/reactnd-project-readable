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
      break

    case Globals.detail:
      response = yield call(api.getPost, parameters.id)
      break

    case Globals.postComments:
      response = yield call(api.getPostComments, parameters.id)
      break
    default:
      break
  }

  if (response.ok) {
    yield put(RetrieveActions.retrieveData(response.data))
    yield put(RetrieveActions.retrieveSuccess())
  } else {
    yield put(RetrieveActions.retrieveFailure(response.problem))
  }
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