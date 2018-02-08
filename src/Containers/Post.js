import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NoMatch from './NoMatch'
import RaisedButton from 'material-ui/RaisedButton'

// Dialog
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'
import UploadActions from '../Redux/UploadRedux'

// Style
import './Styles/bootstrap.css'
import './Styles/style.css'

// UIID
const uuidv4 = require('uuid/v4')

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      author: '',
      body: '',
      open: false,
      openC: false,
      edit: null,
      pTitle: '',
      pAuthor: '',
      pBody: '',
      category: '',

    }
  }

  componentDidMount () {
    this.props.retrieveHome()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.detail === null) {
      let path = this.props.location.pathname
      let id = this.cleanPath(path)
      for (let post of nextProps.posts) {
        if (post.id === id) {
          this.props.loadContent(id)
          this.setState({id})
          break
        }
      }
    }
  }

  cleanPath = (path) => {
    let res = path.split('/')
    this.setState({ category: res[1]})
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
            <IconButton iconClassName='glyphicon glyphicon-edit' onClick={() => this.editComment(comment)}/>
            <IconButton iconClassName='glyphicon glyphicon-remove-sign' onClick={() => this.removeComment(comment)}/>
            <IconButton iconClassName='glyphicon glyphicon-plus' onClick={() => {this.handleCommentPlusVote(comment, 'upVote')}}/>
            <IconButton iconClassName='glyphicon glyphicon-minus' onClick={() => {this.handleCommentPlusVote(comment, 'downVote')}}/>
          </div>
        )
      }
    })

    return render
  }

  handleCommentPlusVote = (p, option) => {
    const comment = {
      id: p.id,
      option
    }
    this.props.voteComment(comment)
    this.props.loadContent(this.state.id)
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
      this.props.loadContent(this.state.id)
    }
  }

  renderCommentDialog = () => {
    return (
      <div>
        <br />
        <TextField
          hintText='Body'
          fullWidth={true}
          onChange={(event, value) => this.handleBody(value)}
        /><br />
        <TextField
          hintText='Author'
          fullWidth={true}
          onChange={(event, value) => this.handleAuthor(value)}
        /><br />
        <FlatButton
          label='Submit'
          primary
          onClick={this.handleSubmit}
        />
      </div>
    )
  }

  editComment = (comment) => this.setState({openC: true, edit: comment})
  handleCloseC = () => this.setState({openC: false})
  handleClose = () => this.setState({open: false})

  handleSubmitEdit = () => {
    const { edit, body } = this.state
    if (body !== '') {
      const comment = {
        body,
        timestamp: Date.now(),
        id: edit.id
      }
      this.props.editComment(comment)
      this.props.loadContent(this.state.id)
      this.handleCloseC()
    }
  }

  removeComment = (comment) => {
    this.props.deleteComment(comment.id)
  }

  editCommentDialog = () => {

    const { edit } = this.state

    if (edit === null) return <div />

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleCloseC}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleSubmitEdit}
      />,
    ]

    return (
      <Dialog
        title="Edit your comment"
        actions={actions}
        modal={false}
        open={this.state.openC}
        onRequestClose={this.handleCloseC}>
        <TextField
          hintText="Body"
          defaultValue={edit.body}
          fullWidth={true}
          onChange={(event, value) => this.handleBody(value)}
        /><br />
        <TextField
          hintText="Author"
          defaultValue={edit.author}
          fullWidth={true}
          onChange={(event, value) => this.handleAuthor(value)}
        /><br />
      </Dialog>
    )
  }

  handlePostTitle = (pTitle) => this.setState({pTitle})
  handlePostBody = (pBody) => this.setState({pBody})

  editPost = () => this.setState({open: true})
  deletePost = () => {
    const { detail } = this.props
    this.props.deletePost(detail.id)
    this.props.history.goBack()
  }

  handleSubmitEditPost = () => {
    const { pBody, pTitle } = this.state
    const { detail } = this.props

    let body = pBody
    let title = pTitle

    if (body === '') body = detail.body
    if (title === '') title = detail.title

    if (body !== '' && title !== '') {
      const post = {
        title,
        body,
        id: detail.id
      }
      this.props.editPost(post)
      this.props.loadContent(this.state.id)
      this.handleClose()
    }
  }

  editPostDialog = () => {

    const { detail } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleSubmitEditPost}
      />,
    ]

    return (
      <Dialog
        title="Edit your post"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}>
        <TextField
          hintText="Title"
          defaultValue={detail.title}
          fullWidth={true}
          onChange={(event, value) => this.handlePostTitle(value)}
        /><br />
        <TextField
          hintText="Body"
          defaultValue={detail.body}
          fullWidth={true}
          onChange={(event, value) => this.handlePostBody(value)}
        /><br />
        <TextField
          hintText="Author"
          disabled
          defaultValue={detail.author}
          fullWidth={true}
        /><br />
      </Dialog>
    )
  }

  handlePlusVote = (p, option) => {
    const post = {
      id: p.id,
      option
    }
    this.props.votePost(post)
    this.props.loadContent(this.state.id)
  }

  goToCategory = () => {
    this.props.history.goBack()
  }

  render () {

    const { detail, comments, posts } = this.props

    if (posts === null) return <div />
    else if (detail === null || comments === null) return <NoMatch/>

    const time = detail.timestamp
    const ts = new Date(time)

    let redirect = true

    for (let post of posts) {
      if (post.id === detail.id && !detail.deleted) {
        redirect = false
        break
      }
    }

    if (!redirect) {
      return (
        <div>
          <div className='single'>
            <div className='container'>
              <Link to="/"><RaisedButton label={'Home'} /></Link>
              <RaisedButton label={'Back'} onClick={() => this.goToCategory()}/>
              <div className='single-top'>
                <div className=' single-grid'>
                  <h4>{detail.title}</h4>
                  <ul className='blog-ic'>
                    <li><span> <i className='glyphicon glyphicon-user' />{detail.author}</span></li>
                    <li><span><i className='glyphicon glyphicon-time' />{ts.toDateString()}</span></li>
                    <li><span><i className='glyphicon glyphicon-plane' />{detail.voteScore}</span></li>
                    <li><span><i className='glyphicon glyphicon-comment' />{detail.commentCount}</span></li>
                  </ul>
                  <p>{detail.body}</p>
                  <IconButton iconClassName='glyphicon glyphicon-edit' onClick={() => {this.editPost()}} />
                  <IconButton iconClassName='glyphicon glyphicon-remove-sign' onClick={() => {this.deletePost()}} />
                  <IconButton iconClassName='glyphicon glyphicon-plus' onClick={() => {this.handlePlusVote(detail, 'upVote')}}/>
                  <IconButton iconClassName='glyphicon glyphicon-minus' onClick={() => {this.handlePlusVote(detail, 'downVote')}}/>
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
            { this.editPostDialog() }
            { this.editCommentDialog() }
          </div>
        </div>
      )
    } else {
      return <NoMatch/>
    }

  }
}

function mapStateToProps (state) {
  return {
    detail: state.retrieve.detail,
    comments: state.retrieve.comments,
    posts: state.retrieve.allPosts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadContent: (id) => dispatch(RetrieveActions.retrieveDetailRequest(id)),
    uploadComment: (comment) => dispatch(UploadActions.uploadCommentRequest(comment)),
    editComment: (comment) => dispatch(UploadActions.editCommentRequest(comment)),
    deleteComment: (id) => dispatch(UploadActions.deleteCommentRequest(id)),
    editPost: (post) => dispatch(UploadActions.editPostRequest(post)),
    deletePost: (id) => dispatch(UploadActions.deletePostRequest(id)),
    votePost: (post) => dispatch(UploadActions.votePostRequest(post)),
    voteComment: (comment) => dispatch(UploadActions.voteCommentRequest(comment)),
    retrieveHome: () => dispatch(RetrieveActions.retrieveHomeRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
