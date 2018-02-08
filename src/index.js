import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import createStore from './Redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
// import { Route, Switch } from 'react-router'
import {
  Route,
  Switch
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './Containers/App'
import Categories from './Containers/Categories'
import Post from './Containers/Post'

import './index.css'
import NoMatch from './Containers/NoMatch'

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
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/:category' component={Categories} />
          <Route exact path='/:category/:id' component={Post} />
          <Route component={NoMatch} />
        </Switch>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
