import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  attemptI18n: ['language'],
  setI18n: ['catalog'],
  successI18n: null,
  failureI18n: ['error']
})

export const I18nTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  language: 'en', // default language English
  catalog: null,
  error: null
})

/* ------------- Reducers ------------- */

export const attemptI18n = (state, {language}) => state.merge({ loading: true, language })

export const setI18n = (state, { catalog }) => state.merge({ catalog })

export const successI18n = (state) => state.merge({loading: false, error: null})

export const failureI18n = (state, { error }) => state.merge({loading: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTEMPT_I18N]: attemptI18n,
  [Types.SET_I18N]: setI18n,
  [Types.SUCCESS_I18N]: successI18n,
  [Types.FAILURE_I18N]: failureI18n
})
