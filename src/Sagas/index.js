import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { I18nTypes } from '../Redux/I18nRedux'
import { RetrieveTypes } from '../Redux/RetrieveRedux'
/* ------------- Sagas ------------- */

import { loadLanguage } from './I18nSagas'
import { retrieve } from './RetrieveSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(I18nTypes.ATTEMPT_I18N, loadLanguage),
    takeLatest(RetrieveTypes.RETRIEVE_ATTEMPT, retrieve, api)
  ])
}
