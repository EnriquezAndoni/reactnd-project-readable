import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'

// Globals
import Globals from '../Utils/Globals'

// Style
import './Styles/bootstrap.min.css'
import './Styles/PostListStyles.css'
import { Images } from '../Theme'

class PostList extends Component {
  /**
   * @description Initialize the state
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = {
      category: props.match.params.category,
      posts: []
    }
  }

  componentDidMount () {
    const parameters = { call: Globals.post, category: this.state.category }
    this.props.loadPosts(parameters)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.posts !== null) {
      this.setState({ posts: nextProps.posts })
    }
  }

  /**
   * @description Render each category
   * @param {array} posts - The posts array
   * @returns {object} the post list rendered
   */
  renderPostList = (posts) => {
    let paint = []

    if (posts.length > 0) {
      for (const post of posts) {
        const time = post.timestamp
        const ts = new Date(time)

        paint.push(
          <div key={post.id} className='container'>
            <div className='row'>
              <div className='col-lg-8 col-md-10 mx-auto'>
                <div className='post-preview'>
                  <Link to={`${this.state.category}/${post.id}`}>
                    <h2 className='post-title'>{post.title}</h2>
                  </Link>
                  <p className='post-meta'>Posted by *{post.author}* on {ts.toDateString()}</p>
                </div>
                <hr />
              </div>
            </div>
          </div>)
      }
    }

    return paint
  }

  /**
   * @description Render the component
   */
  render () {
    const { category, posts } = this.state

    return (
      <div className='content'>
        <header className='masthead' style={{ backgroundImage: `url(${Images[category]})` }}>
          <div className='overlay' />
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 col-md-10 mx-auto'>
                <div className='site-heading'>
                  <h1 className='title-h1'>{category}</h1>
                  <span className='subheading'>Ready to learn more!</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        {this.renderPostList(posts)}
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
    posts: state.retrieve.posts
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
    loadPosts: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
