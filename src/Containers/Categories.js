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

class Categories extends Component {
  /**
   * @description Initialize the state
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = {
      filter: null,
      open: false,
      author: '',
      title: '',
      body: '',
      category: props.match.params.category
    }
  }

  componentDidMount () {
    if (this.props.posts === null) {
      const parameters = { call: Globals.post, category: this.state.category }
      this.props.loadPosts(parameters)
    }
  }

  handleChangeFilter = (event, index, value) => this.setState({filter: value})

  renderPost = (allPosts) => {
    const { filter } = this.state
    let render = []
    if (allPosts !== null) {
      let helper = []
      Object.assign(helper, allPosts)
      if (filter !== null) {
        switch (filter) {
          case 'date':
            helper.sort((a,b) => { return new Date(b.timestamp) - new Date(a.timestamp) })
            break
          case 'votes':
            helper.sort((a,b) => { return b.voteScore - a.voteScore })
            break
          default: break
        }
      }

      for (const post of helper) {
        const time = post.timestamp
        const ts = new Date(time)

        if (post.deleted === false) {
          render.push(
            <div className='about-tre' key={post.id}>
              <div className='a-1'>
                <div className='col-md-6 abt-left'>
                  <h6>{post.category}</h6>
                  <Link to={`${this.state.category}/${post.id}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <p>{post.body}</p>
                  <label>{ts.toDateString()} - Votes: {post.voteScore}</label>
                </div>
              </div>
            </div>
          )
        }
      }
    }
    return render
  }

  handleOpen = () => this.setState({open: true})
  handleClose = () => this.setState({open: false})
  handleTitle = (title) => this.setState({title})
  handleBody = (body) => this.setState({body})
  handleAuthor = (author) => this.setState({author})
  handleSubmit = () => {
    const { title, author, body, category } = this.state
    if (title !== '' && author !== '' && body !== '') {
      const post = {
        title,
        author,
        body,
        category,
        timestamp: Date.now(),
        id: String(uuidv4())
      }
      this.props.uploadPost(post)
      this.handleClose()
      const parameters = { call: Globals.post, category }
      this.props.loadPosts(parameters)
    }
  }

  renderDialog = () => {

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleSubmit}
      />,
    ]

    return (
      <div>
        <RaisedButton label={'Add new post'} onClick={this.handleOpen}/>
        <Dialog
          title="Create your new post"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Title"
            fullWidth={true}
            onChange={(event, value) => this.handleTitle(value)}
          /><br />
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
        </Dialog>
      </div>
    )
  }

  /**
   * @description Render the component
   */
  render () {
    const { filter, category } = this.state
    const { posts } = this.props

    return (
      <div className='about'>
        <div className='container'>
          <div className='about-main'>
            <div className='col-md-8 about-left'>
              <div className='about-one'>
                <p>Posts</p>
                <h3>{category}</h3>
                <div className="about-tre">
                  <SelectField
                    floatingLabelText="Post filter"
                    value={filter}
                    onChange={this.handleChangeFilter}
                    fullWidth={true} >
                    <MenuItem value={'date'} primaryText={'Order by date'} />
                    <MenuItem value={'votes'} primaryText={'Order by votes'} />
                  </SelectField>
                  { this.renderPost(posts) }
                </div>
              </div>
            </div>
            <div className='col-md-4 about-right heading'>
              <div className='abt-2'>
                { this.renderDialog() }
              </div>
            </div>
            <div className='clearfix' />
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
 *  {func} retrieveHome: dispatch the retrieveHomeRequest action
 *  {func} uploadPost: dispatch the uploadRequest action
 */
function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters)),
    uploadPost: (post) => dispatch(UploadActions.uploadRequest(post))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Categories)
