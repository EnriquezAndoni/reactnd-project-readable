import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerMiddleware } from 'react-router-redux'

/*
* Create the store
* */
export default (rootReducer, rootSaga, history) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Route Middleware ------------- */

  // Build the middleware for intercepting and dispatching navigation actions
  middleware.push(routerMiddleware(history))

  const store = createStore(rootReducer, enhancers(applyMiddleware(...middleware)))

  // Kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
