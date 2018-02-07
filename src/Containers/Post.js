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
      id: null
    }
  }

  componentDidMount () {
    // Coger id del path mirar si esta en el store y coger de ahi
    // Si no peticion
    const { posts, loadPost } = this.props
    let path = this.props.location.pathname
    let id = this.cleanPath(path)
    this.setState({ id })

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
    if (nextProps.comments === null) {
      const params = { call: Globals.postComments, id: this.state.id }
      this.props.loadPost(params)
    }
  }

  renderComments = (comments) => {

    // console.log('HEY')
    console.log(comments)



    let paint = []
    if (comments === null) return paint
    if (comments.length > 0) {
      for (const comment of comments) {
        const time = comment.timestamp
        const ts = new Date(time)
        paint.push(

          <div className="col-lg-8 col-md-10 mx-auto" key={comment.id}>
            <div className="panel panel-white post panel-shadow">
              <div className="post-heading">
                <div className="pull-left image">
                  <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user profile image" />
                </div>
                <div className="pull-left meta">
                  <div className="title h5">
                    <a href="#"><b>{comment.autho}</b></a>
                  </div>
                  <h6 className="text-muted time">{ts.toDateString()}</h6>
                </div>
              </div>
              <div className="post-description">
                <p>{comment.body}</p>
                <div className="stats">
                  <a href="#" className="btn btn-default stat-item">
                    <i className="fa fa-thumbs-up icon"></i>{comment.voteScore}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    return paint

  }

  /**
   * @description Render the component
   */
  render () {
    const { detail, comments } = this.props

    if (detail !== null) {
      const time = detail.timestamp
      const ts = new Date(time)
      return (
        <div className='content'>
          <header className='masthead'>
            <div className='overlay' />
          </header>
          <div key={detail.id} className='container'>
            <div className='row'>
              <div className='col-lg-8 col-md-10 mx-auto'>
                <div className='post-preview'>
                  <h2 className='post-title'>{detail.title}</h2>
                  <p className='post-meta'>Posted by *{detail.author}* on {ts.toDateString()} votes: {detail.voteScore}</p>
                </div>
                <hr />
                <div className='selection'>
                  {detail.body}
                </div>
                <hr />

                <div className="row" >
                  {this.renderComments(comments)}
                </div>

                <div className="row">

                  <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="widget-area no-padding blank">
                      <div className="status-upload">
                        <form>
                          <textarea placeholder="Type your new comment" ></textarea>
                          <button type="submit" className="btn btn-success green">Share</button>
                        </form>
                      </div>
                    </div>
                  </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(Post)
