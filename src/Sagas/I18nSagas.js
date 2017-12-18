import { put } from 'redux-saga/effects'
import I18nRedux from '../Redux/I18nRedux'

/**
 * @description Load the new language catalog
 * @param {object} api - The connection with the api
 * @param {string} language - The new language
 */
export function * loadLanguage ({ language}) {
  const catalog = yield import(`../locale/${language}/messages.js`)

  yield put(I18nRedux.setI18n(catalog))
  yield put(I18nRedux.successI18n())
}
