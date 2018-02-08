import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { I18nTypes } from '../Redux/I18nRedux'
import { RetrieveTypes } from '../Redux/RetrieveRedux'
import { UploadTypes } from '../Redux/UploadRedux'

/* ------------- Sagas ------------- */

import { loadLanguage } from './I18nSagas'
import { retrieve, retrieveHome } from './RetrieveSagas'
import { uploadContent, uploadComment } from './UploadSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(I18nTypes.ATTEMPT_I18N, loadLanguage),
    takeLatest(RetrieveTypes.RETRIEVE_HOME_REQUEST, retrieveHome, api),
    takeLatest(RetrieveTypes.RETRIEVE_ATTEMPT, retrieve, api),
    takeLatest(UploadTypes.UPLOAD_REQUEST, uploadContent, api),
    takeLatest(UploadTypes.UPLOAD_COMMENT_REQUEST, uploadComment, api)
  ])
}
