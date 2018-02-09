import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NoMatch from './NoMatch'

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

// Globals
import Globals from '../Utils/Globals'

// Style
import './Styles/bootstrap.css'
import './Styles/style.css'


// UIID
import uuidv4 from 'uuid/v4'

class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: null,
      open: false,
      author: '',
      title: '',
      body: '',
      category: props.match.params.category,
      posts: []
    }
  }

  componentDidMount () {
    const parameters = { call: Globals.post, category: this.state.category }
    this.props.loadPosts(parameters)
  }

  componentWillReceiveProps (nextProps) {
    this.forceUpdate()
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const parameters = { call: Globals.post, category: nextProps.match.params.category }
      this.props.loadPosts(parameters)
    }

    if (nextProps.posts !== this.state.posts) {
      this.setState({ posts: nextProps.posts })
    }
  }

  handleChangeFilter = (event, index, value) => this.setState({filter: value})

  renderPost = () => {
    const { filter, posts } = this.state
    let render = []
    if (posts !== null) {
      let helper = []
      Object.assign(helper, posts)
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
                  <Link to={`${this.state.category}/${post.id}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <p>{ts.toDateString()} - Comments: {post.commentCount}</p>
                  <label>
                    Votes: {post.voteScore}
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
    const parameters = { call: Globals.post, category: this.props.match.params.category }
    this.props.loadPosts(parameters)
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
        label='Cancel'
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary
        onClick={this.handleSubmit}
      />,
    ]

    return (
      <div>
        <Link to='/'><RaisedButton label={'Home'} /></Link>
        <RaisedButton label={'Add new post'} onClick={this.handleOpen}/>
        <Dialog
          title='Create your new post'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText='Title'
            fullWidth={true}
            onChange={(event, value) => this.handleTitle(value)}
          /><br />
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
        </Dialog>
      </div>
    )
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

  render () {
    const { filter, category } = this.state
    const { categories } = this.props

    if (categories === null) return null

    let redirect = true

    for (let cat of categories.categories) {
      if (category === cat.name && !cat.deleted) {
        redirect = false
        break
      }
    }

    if (!redirect) {
      return (
        <div className='about'>
          <div className='container'>
            <div className='about-main'>
              <div className='col-md-8 about-left'>
                <div className='about-one'>
                  <p>Posts</p>
                  <h3>{category}</h3>
                  <div className='about-tre'>
                    <SelectField
                      floatingLabelText='Post filter'
                      value={filter}
                      onChange={this.handleChangeFilter}
                      fullWidth={true} >
                      <MenuItem value={'date'} primaryText={'Order by date'} />
                      <MenuItem value={'votes'} primaryText={'Order by votes'} />
                    </SelectField>
                    { this.renderPost() }
                  </div>
                </div>
              </div>
              <div className='col-md-4 about-right heading'>
                <div className='abt-1'>
                  { this.renderDialog() }
                </div>
                <div className='abt-2'>
                  <h3>BEST CATEGORIES</h3>
                  { this.renderCategories(categories) }
                </div>
              </div>
              <div className='clearfix' />
            </div>
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
    posts: state.retrieve.posts,
    categories: state.retrieve.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters)),
    uploadPost: (post) => dispatch(UploadActions.uploadRequest(post)),
    votePost: (post) => dispatch(UploadActions.votePostRequest(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
