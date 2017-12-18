import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import createStore from './Redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import registerServiceWorker from './registerServiceWorker'

import App from './Containers/App'
import PostList from './Containers/PostList'

import './index.css'

// Create a history : browser history in this case
const history = createHistory()

// Create application store and pass the history
const store = createStore(history)

/**
 * @description Configure the app
 * It renders the components and configures the application (Redux & Saga)
 */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path='/' component={App} />
        <Route exact path='/:category' component={PostList} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
