import React, { Component } from 'react'
import { connect } from 'react-redux'

// Style
import './Styles/bootstrap.min.css'
import './Styles/PostStyles.css'

class Post extends Component {
  /**
   * @description Initialize the state
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = {
      post: null
    }
  }

  /**
   * @description Render the component
   */
  render () {
    const { post } = this.state

    return (
      <div className='content'>
      </div>
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
    post: state.retrieve.post
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps)(Post)
