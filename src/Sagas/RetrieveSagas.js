import { call, put } from 'redux-saga/effects'
import RetrieveActions from '../Redux/RetrieveRedux'

/**
 * @description Load the new language catalog
 * @param {object} api - The connection with the api
 */
export function * retrieveCategories (api) {
  let response = yield call(api.getCategories)
  console.log(response)

  if (response.ok) {
    yield put(RetrieveActions.retrieveData(response.data))
    yield put(RetrieveActions.retrieveSuccess())
  } else {
    yield put(RetrieveActions.retrieveFailure(response.problem))
  }
}
