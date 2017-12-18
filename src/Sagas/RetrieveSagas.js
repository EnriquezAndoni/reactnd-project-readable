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

    case Globals.post:
      response = yield call(api.getCategoryPosts, parameters.category)
      break
  }

  if (response.ok) {
    yield put(RetrieveActions.retrieveData(response.data))
    yield put(RetrieveActions.retrieveSuccess())
  } else {
    yield put(RetrieveActions.retrieveFailure(response.problem))
  }
}
