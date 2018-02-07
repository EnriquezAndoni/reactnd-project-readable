import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Globals from '../Utils/Globals'

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
  call: null,
  categories: null,
  allPosts: null,
  posts: null,
  detail: null,
  comments: null,
  error: null
})

/* ------------- Reducers ------------- */

export const retrieveAttempt = (state, { parameters }) => state.merge({ loading: true, call: parameters.call })

export const retrieveData = (state, { data }) => {
  let newState

  switch (state.call) {
    case Globals.category:
      newState = state.merge({ categories: data.categories })
      break
    case Globals.allPosts:
      newState = state.merge({ allPosts: data })
      break
    case Globals.post:
      newState = state.merge({ posts: data })
      break
    case Globals.detail:
      newState = state.merge({ detail: data })
      break
    case Globals.postComments:
      newState = state.merge({ comments: data })
      break
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
