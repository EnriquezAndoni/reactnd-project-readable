import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Globals from '../Utils/Globals'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  retrieveAttempt: ['parameters'],
  retrieveData: ['data'],
  retrieveSuccess: null,
  retrieveFailure: ['error'],

  retrieveHomeRequest: null,
  retrieveHomeSuccess: ['categories', 'allPosts'],
  retrieveHomeFailure: ['e1', 'e2'],

  retrieveDetailRequest: ['id'],
  retrieveDetailSuccess: ['detail', 'comments'],
  retrieveDetailFailure: ['e1', 'e2']
})

export const RetrieveTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  call: null,
  categories: null,
  allPosts: null,
  posts: null,
  detail: null,
  comments: null,
  error: null,
  e1: null,
  e2: null
})

/* ------------- Reducers ------------- */

export const retrieveAttempt = (state, { parameters }) => state.merge({ loading: true, call: parameters.call })

export const retrieveData = (state, { data }) => {
  let newState

  switch (state.call) {
    case Globals.post:
      newState = state.merge({ posts: data })
      break
    default:
      break
  }
  return newState
}

export const retrieveSuccess = (state) => state.merge({loading: false, error: null})

export const retrieveFailure = (state, { error }) => state.merge({loading: false, error})

export const retrieveHomeRequest = (state) => state.merge({ loading: true })

export const retrieveHomeSuccess = (state, { categories, allPosts }) => state.merge({loading: false, error: null, categories, allPosts})

export const retrieveHomeFailure = (state, { e1, e2 }) => state.merge({loading: false, e1, e2})

export const retrieveDetailRequest = (state) => state.merge({ loading: true })

export const retrieveDetailSuccess = (state, { detail, comments }) => state.merge({loading: false, error: null, detail, comments})

export const retrieveDetailFailure = (state, { e1, e2 }) => state.merge({loading: false, e1, e2})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RETRIEVE_ATTEMPT]: retrieveAttempt,
  [Types.RETRIEVE_DATA]: retrieveData,
  [Types.RETRIEVE_SUCCESS]: retrieveSuccess,
  [Types.RETRIEVE_FAILURE]: retrieveFailure,

  [Types.RETRIEVE_HOME_REQUEST]: retrieveHomeRequest,
  [Types.RETRIEVE_HOME_SUCCESS]: retrieveHomeSuccess,
  [Types.RETRIEVE_HOME_FAILURE]: retrieveHomeFailure,

  [Types.RETRIEVE_DETAIL_REQUEST]: retrieveDetailRequest,
  [Types.RETRIEVE_DETAIL_SUCCESS]: retrieveDetailSuccess,
  [Types.RETRIEVE_DETAIL_FAILURE]: retrieveDetailFailure
})
