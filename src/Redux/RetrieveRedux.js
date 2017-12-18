import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  retrieveAttempt: ['parameters'],
  retrieveData: ['data'],
  retrieveSuccess: null,
  retrieveFailure: ['error']
})

export const RetrieveTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  categories: null,
  error: null
})

/* ------------- Reducers ------------- */

export const retrieveAttempt = (state) => state.merge({ loading: true })

export const retrieveData = (state, { data }) => {
  let newState

  if (data.categories !== undefined) {
    newState = state.merge({ categories: data.categories })
  }

  return newState
}

export const retrieveSuccess = (state) => state.merge({loading: false, error: null})

export const retrieveFailure = (state, { error }) => state.merge({loading: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RETRIEVE_ATTEMPT]: retrieveAttempt,
  [Types.RETRIEVE_DATA]: retrieveData,
  [Types.RETRIEVE_SUCCESS]: retrieveSuccess,
  [Types.RETRIEVE_FAILURE]: retrieveFailure
})
