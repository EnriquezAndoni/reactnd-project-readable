import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Translation
import { I18nProvider } from 'lingui-react'
import { unpackCatalog } from 'lingui-i18n'

// Actions
import I18nActions from '../Redux/I18nRedux'

// Components
import Home from './Home'

class App extends Component {
  /**
   * @description Required props
   */
  static propTypes = {
    loadLanguage: PropTypes.func
  }

  /**
   * @constructor
   * @description Initialize the state
   */
  constructor (props) {
    super(props)
    this.state = {
      catalogs: {}
    }
  }

  /**
   * @description Load a predefined language
   */
  componentDidMount () {
    const { language } = this.props
    this.props.loadLanguage(language)
  }

  /**
   * @description Update the state with nextProps
   * @param {object} nextProps - The received props
   */
  componentWillReceiveProps (nextProps) {
    const { language, catalog } = nextProps
    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: unpackCatalog(catalog)
      }
    }))
  }

  /**
   * @description Check when to re-render the component
   * @param {object} nextProps - The received props
   * @param {object} nextState - The next state
   */
  shouldComponentUpdate (nextProps, nextState) {
    const { language } = nextProps
    const { catalogs } = nextState

    if (language !== this.props.language && !catalogs[language]) {
      // Start loading message catalog and skip update
      this.props.loadLanguage(language)
      return false
    }
    return true
  }

  /**
   * @description Render the component
   */
  render () {
    const { language } = this.props
    const { catalogs } = this.state

    // Skip rendering when catalog isn't loaded.
    if (!catalogs[language]) return (<div/>)

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        <div>
          <Home />
        </div>
      </I18nProvider>
    )
  }
}

/**
 * @description Get the props from the store state
 * @param {object} state - Store state
 * @returns {object}
 *  {string} language: the stored language
 *  {import} catalog: the loaded catalog import
 */
function mapStateToProps (state) {
  return {
    language: state.i18n.language,
    catalog: state.i18n.catalog
  }
}

/**
 * @description Get the props from the store state
 * @param {object} dispatch
 * @returns {object}
 *  {func} loadLanguage: dispatch the attemptI18n reducer
 */
function mapDispatchToProps (dispatch) {
  return {
    loadLanguage: (language) => dispatch(I18nActions.attemptI18n(language))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
