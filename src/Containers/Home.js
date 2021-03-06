import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import IconButton from 'material-ui/IconButton'

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

// Style
import './Styles/bootstrap.css'
import './Styles/style.css'

// UIID
import uuidv4 from 'uuid/v4'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: null,
      open: false,
      select: null,
      author: '',
      title: '',
      body: '',
      post: null,
      edit: false,
      pTitle: '',
      pBody: ''
    }
  }

  componentDidMount () {
    this.props.retrieveHome()
  }

  renderCategories = (categories) => {
    let render = []
    if (categories !== null) {
      categories.categories.forEach(category => {
        render.push(
          <div className='might-grid' key={category.name}>
            <div className='might-top'>
              <Link to={category.path}>
                <h4>{category.name}</h4>
              </Link>
              <p>Find the best post related to this category.</p>
            </div>
            <div className='clearfix' />
          </div>
        )
      })
    }

    return render
  }

  editPost = (post) => this.setState({edit: true, post})
  closeEdit = () => this.setState({edit: false})
  deletePost = (post) => {
    this.props.deletePost(post.id)
    this.props.retrieveHome()
  }

  handlePostTitle = (pTitle) => this.setState({pTitle})
  handlePostBody = (pBody) => this.setState({pBody})

  handleSubmitEditPost = () => {
    const { pBody, pTitle, post } = this.state

    let body = pBody
    let title = pTitle

    if (body === '') body = post.body
    if (title === '') title = post.title

    if (body !== '' && title !== '') {
      const p = {
        title,
        body,
        id: post.id
      }
      this.props.editPost(p)
      this.props.retrieveHome()
      this.closeEdit()
    }
  }

  editPostDialog = () => {

    const { post } = this.state

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.closeEdit}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleSubmitEditPost}
      />,
    ]

    if (post !== null) {
      return (
        <Dialog
          title="Edit your post"
          actions={actions}
          modal={false}
          open={this.state.edit}
          onRequestClose={this.handleClose}>
          <TextField
            hintText="Title"
            defaultValue={post.title}
            fullWidth={true}
            onChange={(event, value) => this.handlePostTitle(value)}
          /><br />
          <TextField
            hintText="Body"
            defaultValue={post.body}
            fullWidth={true}
            onChange={(event, value) => this.handlePostBody(value)}
          /><br />
          <TextField
            hintText="Author"
            disabled
            defaultValue={post.author}
            fullWidth={true}
          /><br />
        </Dialog>
      )
    } else return null
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
        const ts = new Date(post.timestamp)

        if (post.deleted === false) {
          render.push(
            <div className='about-tre' key={post.id}>
              <div className='a-1'>
                <div className='col-md-6 abt-left'>
                  <h6>{post.category}</h6>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <p>{post.author} - {ts.toDateString()} - Comments: {post.commentCount}</p>
                  <label>
                    Votes: {post.voteScore}
                    <IconButton iconClassName='glyphicon glyphicon-edit' onClick={() => {this.editPost(post)}} />
                    <IconButton iconClassName='glyphicon glyphicon-remove-sign' onClick={() => {this.deletePost(post)}} />
                    <IconButton iconClassName='glyphicon glyphicon-plus' onClick={() => {this.handlePlusVote(post, 'upVote')}}/>
                    <IconButton iconClassName='glyphicon glyphicon-minus' onClick={() => {this.handlePlusVote(post, 'downVote')}}/>
                  </label>
                </div>
              </div>
            </div>
          )
        }
      }
    }
    return render
  }

  handlePlusVote = (p, option) => {
    const post = {
      id: p.id,
      option
    }
    this.props.votePost(post)
    this.props.retrieveHome()
  }

  handleOpen = () => this.setState({open: true})
  handleClose = () => this.setState({open: false})
  handleTitle = (title) => this.setState({title})
  handleBody = (body) => this.setState({body})
  handleAuthor = (author) => this.setState({author})
  handleChangeSelect = (event, index, value) => this.setState({select: value})
  handleSubmit = () => {
    const { title, author, body, select } = this.state
    if (title !== '' && author !== '' && body !== '' && select !== null) {
      const post = {
        title,
        author,
        body,
        category: select,
        timestamp: Date.now(),
        id: String(uuidv4())
      }
      this.props.uploadPost(post)
      this.handleClose()
      this.props.retrieveHome()
    }
  }

  renderDialog = (categories) => {

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
          <SelectField
            floatingLabelText="Select the category"
            value={this.state.select}
            onChange={this.handleChangeSelect}
            fullWidth={true}
          >
            { this.renderCategoriesMenu(categories) }
          </SelectField>
        </Dialog>
      </div>
    )
  }

  renderCategoriesMenu = (categories) => {
    let render = []
    if (categories !== null) {
      categories.categories.forEach(category => {
        render.push(
          <MenuItem key={category.name} value={category.name} primaryText={category.name} />
        )
      })
    }
    return render
  }

  render () {
    const { filter } = this.state
    const { categories, allPosts } = this.props

    return (
      <div className='about'>
        <div className='container'>
          <div className='about-main'>
            <div className='col-md-8 about-left'>
              <div className='about-one'>
                <p>Best</p>
                <h3>Posts</h3>
                <div className="about-tre">
                  <SelectField
                    floatingLabelText="Post filter"
                    value={filter}
                    onChange={this.handleChangeFilter}
                    fullWidth={true} >
                    <MenuItem value={'date'} primaryText={'Order by date'} />
                    <MenuItem value={'votes'} primaryText={'Order by votes'} />
                  </SelectField>
                  { this.renderPost(allPosts) }
                </div>
              </div>
            </div>
            <div className='col-md-4 about-right heading'>
              <div className='abt-2'>
                <h3>BEST CATEGORIES</h3>
                { this.renderCategories(categories) }
              </div>
              <div className='abt-2'>
              { this.renderDialog(categories) }
              </div>
            </div>
            <div className='clearfix' />
          </div>
          { this.editPostDialog() }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    categories: state.retrieve.categories,
    allPosts: state.retrieve.allPosts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    retrieveHome: () => dispatch(RetrieveActions.retrieveHomeRequest()),
    uploadPost: (post) => dispatch(UploadActions.uploadRequest(post)),
    votePost: (post) => dispatch(UploadActions.votePostRequest(post)),
    editPost: (post) => dispatch(UploadActions.editPostRequest(post)),
    deletePost: (id) => dispatch(UploadActions.deletePostRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
