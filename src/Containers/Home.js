import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'

// Style
import './Styles/bootstrap.css'
import './Styles/style.css'

class Home extends Component {
    /**
     * @description Initialize the state
     * @constructor
     */
  constructor (props) {
    super(props)
    this.state = {}
  }

    /**
     * @description Render the component
     */
  render () {
    return (
      <div className='content' />
    )
  }
}

/**
 * @description Get the props from the store state
 * @param {object} state - Store state
 * @returns {object}
 *  {import} categories: loaded categories
 */
function mapStateToProps (state) {
  return {
    posts: state.retrieve.posts,
    detail: state.retrieve.detail,
    comments: state.retrieve.comments
  }
}

/**
 * @description Get the props from the store state
 * @param {object} dispatch
 * @returns {object}
 *  {func} loadCategories: dispatch the retrieveAttempt reducer
 */
function mapDispatchToProps (dispatch) {
  return {
    loadPost: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home)
