import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'

// Style
import './Styles/bootstrap.min.css'
import './Styles/PostStyles.css'
import Globals from "../Utils/Globals";
import {Images} from "../Theme";

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

  componentDidMount () {
    // Coger id del path mirar si esta en el store y coger de ahi
    // Si no peticion
    const { posts, loadPost } = this.props
    let path = this.props.location.pathname
    let id = this.cleanPath(path)

    if (posts !== null) this.getPostFromProps(posts, id)
    else {
      const parameters = { call: Globals.detail, id }
      loadPost(parameters)
    }
  }

  cleanPath = (path) => {
    let res = path.split('/')
    return res[2]
  }

  getPostFromProps = (posts, id) => {
    let BreakException = {}
    try {
      posts.forEach(post => {
        if (post.id === id) {
          this.setState({ post })
          throw BreakException
        }
      })
    } catch (e) {
      if (e !== BreakException) throw e
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.detail !== null) {
      this.setState({ post: nextProps.detail })
    }
  }

  /**
   * @description Render the component
   */
  render () {
    const { post } = this.state

    if (post !== null) {
      console.log(post)
      const time = post.timestamp
      const ts = new Date(time)
      return (
        <div className='content'>
          <header className='masthead'>
            <div className='overlay' />
          </header>
          <div key={post.id} className='container'>
            <div className='row'>
              <div className='col-lg-8 col-md-10 mx-auto'>
                <div className='post-preview'>
                  <h2 className='post-title'>{post.title}</h2>
                  <p className='post-meta'>Posted by *{post.author}* on {ts.toDateString()}</p>
                </div>
                <hr />
                <div className='selection'>
                  {post.body}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <div />

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
    detail: state.retrieve.detail
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
export default connect(mapStateToProps, mapDispatchToProps)(Post)
