import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'
import { routerReducer } from 'react-router-redux'

export default (history) => {
  /* ------------- Assemble The Reducers ------------- */

  const rootReducer = combineReducers({
    router: routerReducer,
    i18n: require('./I18nRedux').reducer
  })

  return configureStore(rootReducer, rootSaga, history)
}
