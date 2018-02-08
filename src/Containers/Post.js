import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Dialog
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

// Filter
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'
import UploadActions from '../Redux/UploadRedux'

// Globals
import Globals from '../Utils/Globals'

// Style
import './Styles/bootstrap.css'
import './Styles/style.css'

// UIID
const uuidv4 = require('uuid/v4')

class Post extends Component {
  /**
   * @description Initialize the state
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      author: '',
      body: ''
    }
  }

  componentDidMount () {
    if (this.props.detail === null) {
      let path = this.props.location.pathname
      let id = this.cleanPath(path)
      const parameters = { call: Globals.detail, id }
      this.props.loadContent(parameters)
      this.setState({id})
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.comments === null) {
      const parameters = { call: Globals.postComments, id: this.state.id }
      this.props.loadContent(parameters)
    }
  }

  cleanPath = (path) => {
    let res = path.split('/')
    return res[2]
  }

  renderComments = (comments) => {
    let render = []
    comments.forEach(comment => {
      if (comment.deleted === false) {
        const time = comment.timestamp
        const ts = new Date(time)
        render.push(
          <div className='media' key={comment.id}>
            <div className='media-body'>
              <h4 className='media-heading'>{comment.author}</h4>
              <ul className='blog-ic'>
                <li><span><i className='glyphicon glyphicon-time' />{ts.toDateString()}</span></li>
                <li><span><i className='glyphicon glyphicon-plane' />{comment.voteScore}</span></li>
              </ul>
              <p>{comment.body}</p>
            </div>
          </div>
        )
      }
    })

    return render
  }

  handleBody = (body) => this.setState({body})
  handleAuthor = (author) => this.setState({author})
  handleSubmit = () => {
    const { author, body } = this.state
    if (author !== '' && body !== '') {
      const comment = {
        author,
        body,
        parentId: this.state.id,
        timestamp: Date.now(),
        id: String(uuidv4())
      }
      this.props.uploadComment(comment)
      const parameters = { call: Globals.postComments, id: this.state.id }
      this.props.loadContent(parameters)
    }
  }

  renderCommentDialog = () => {
    return (
      <div>
        <br />
        <TextField
          hintText="Body"
          fullWidth={true}
          onChange={(event, value) => this.handleBody(value)}
        /><br />
        <TextField
          hintText="Author"
          fullWidth={true}
          onChange={(event, value) => this.handleAuthor(value)}
        /><br />
        <FlatButton
          label="Submit"
          primary
          onClick={this.handleSubmit}
        />
      </div>
    )
  }

  /**
   * @description Render the component
   */
  render () {

    const { detail, comments } = this.props

    if (detail === null || comments === null) return <div />

    const time = detail.timestamp
    const ts = new Date(time)

    return (
      <div >
        <div className='single'>
          <div className='container'>
            <div className='single-top'>
              <div className=' single-grid'>
                <h4>{detail.title}</h4>
                <ul className='blog-ic'>
                  <li><span> <i className='glyphicon glyphicon-user' />{detail.author}</span></li>
                  <li><span><i className='glyphicon glyphicon-time' />{ts.toDateString()}</span></li>
                  <li><span><i className='glyphicon glyphicon-plane' />{detail.voteScore}</span></li>
                </ul>
                <p>{detail.body}</p>
                </div>
              <div className='comments heading'>
                <h3>Comments</h3>
                { this.renderComments(comments) }
              </div>
              <div className='comment-bottom heading'>
                <h3>Leave a Comment</h3>
                { this.renderCommentDialog() }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * @description Get the props from the store state
 * @param {object} state - Store state
 * @returns {object}
 */
function mapStateToProps (state) {
  return {
    detail: state.retrieve.detail,
    comments: state.retrieve.comments
  }
}

/**
 * @description Get the props from the store state
 * @param {object} dispatch
 * @returns {object}
 */
function mapDispatchToProps (dispatch) {
  return {
    loadContent: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters)),
    uploadComment: (comment) => dispatch(UploadActions.uploadCommentRequest(comment))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Post)
