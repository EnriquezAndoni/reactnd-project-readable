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

  componentDidMount () {
    // Coger id del path mirar si esta en el store y coger de ahi
    // Si no peticion
    const { posts } = this.props
    let path = this.props.location.pathname
    let id = this.cleanPath(path)

    if (posts !== null) this.getPostFromProps(posts, id)
    else console.log('No')
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

  /**
   * @description Render the component
   */
  render () {
    const { post } = this.state

    if (post !== null) {
      console.log(post)
      return (
        <div className='content'>
          {post.body}
        </div>
      )
    }

    return (
      <div className='content'>
        Hi
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
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps)(Post)
