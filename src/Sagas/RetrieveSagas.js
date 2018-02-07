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
    case Globals.category:
      response = yield call(api.getCategories)
      break

    case Globals.allPosts:
      response = yield call(api.getAllPosts)
      console.log(response)
      break

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
