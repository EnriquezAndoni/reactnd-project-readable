import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  uploadRequest: ['post'],
  uploadSuccess: null,
  uploadFailure: ['error'],
  uploadCommentRequest: ['comment'],
  uploadCommentSuccess: null,
  uploadCommentFailure: ['error'],
  editCommentRequest: ['comment'],
  editCommentSuccess: null,
  editCommentFailure: ['error'],
  deleteCommentRequest: ['id'],
  deleteCommentSuccess: null,
  deleteCommentFailure: ['error']
})

export const UploadTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

export const uploadRequest = (state) => state.merge({ fetching: true })

export const uploadSuccess = (state) => state.merge({ fetching: false, error: null })

export const uploadFailure = (state, { error }) => state.merge({ fetching: false, error })

export const uploadCommentRequest = (state) => state.merge({ fetching: true })

export const uploadCommentSuccess = (state) => state.merge({ fetching: false, error: null })

export const uploadCommentFailure = (state, { error }) => state.merge({ fetching: false, error })

export const editCommentRequest = (state) => state.merge({ fetching: true })

export const editCommentSuccess = (state) => state.merge({ fetching: false, error: null })

export const editCommentFailure = (state, { error }) => state.merge({ fetching: false, error })

export const deleteCommentRequest = (state) => state.merge({ fetching: true })

export const deleteCommentSuccess = (state) => state.merge({ fetching: false, error: null })

export const deleteCommentFailure = (state, { error }) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPLOAD_REQUEST]: uploadRequest,
  [Types.UPLOAD_SUCCESS]: uploadSuccess,
  [Types.UPLOAD_FAILURE]: uploadFailure,
  [Types.UPLOAD_COMMENT_REQUEST]: uploadCommentRequest,
  [Types.UPLOAD_COMMENT_SUCCESS]: uploadCommentSuccess,
  [Types.UPLOAD_COMMENT_FAILURE]: uploadCommentFailure,
  [Types.EDIT_COMMENT_REQUEST]: editCommentRequest,
  [Types.EDIT_COMMENT_SUCCESS]: editCommentSuccess,
  [Types.EDIT_COMMENT_FAILURE]: editCommentFailure,
  [Types.DELETE_COMMENT_REQUEST]: deleteCommentRequest,
  [Types.DELETE_COMMENT_SUCCESS]: deleteCommentSuccess,
  [Types.DELETE_COMMENT_FAILURE]: deleteCommentFailure
})
