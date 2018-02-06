import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Select
import Select from 'react-select'
import 'react-select/dist/react-select.css'

// Translation
import { Trans } from 'lingui-react'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'

// Globals
import Globals from '../Utils/Globals'

// Style
import './Styles/bootstrap.min.css'
import './Styles/CategoryStyles.css'
import { Images } from '../Theme'


class Category extends Component {
  /**
   * @description Initialize the state
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      posts: [],
      selectedOption: ''
    }
  }

  componentDidMount () {
    if (this.props.categories === null) {
      const parameters = { call: Globals.category }
      this.props.loadAction(parameters)
    } else {
      this.setState({ categories: this.props.categories, posts: this.props.posts })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.categories !== null) {
      this.setState({ categories: nextProps.categories })
      if (this.props.posts === null) {
        const parameters = { call: Globals.allPosts }
        this.props.loadAction(parameters)
      }
    }

    if (nextProps.posts !== null) {
      this.setState({ posts: nextProps.posts })
    }
  }

  /**
   * @description Render each category
   * @param {array} categories - The categories array
   * @returns {object} the categories rendered
   */
  renderCategories = (categories) => {
    let paint = []

    if (categories.length > 0) {
      for (const category of categories) {
        paint.push(
          <div key={category.name} className='col-lg-3 col-md-4 col-sm-6 portfolio-item'>
            <div className='card h-100'>
              <Link to={category.path}>
                <img className='card-img-top' src={Images[category.name]} alt='' />
              </Link>
            </div>
          </div>)
      }
    }

    return paint
  }

  renderPosts = (posts) => {
    let paint = []

    const { selectedOption } = this.state

    if (posts.length > 0) {
      let helper = []
      Object.assign(helper, posts)

      if (selectedOption !== null) {
        switch (selectedOption.value) {
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

        paint.push(
          <div key={post.id} className='col-md-4'>
            <div className='post-preview'>
              <h3 className='post-title'>{post.title}</h3>
              <p className='post-meta'>On {ts.toDateString()} votes: {post.voteScore}</p>
            </div>
          </div>
          )
      }
    }

    return paint
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  /**
   * @description Render the component
   */
  render () {
    const { categories, posts, selectedOption } = this.state
    const value = selectedOption && selectedOption.value

    return (
      <div className='content'>
        <div className='container'>
          <div className='header-sep'>
          <h1 className='my-4'><Trans id='Categories'>Categories</Trans></h1>
            <div className='space-between'>
              <div className='row'>
                {this.renderCategories(categories)}
              </div>
            </div>
          </div>
          <div className='header-sep'>
            <h1 className='my-4'><Trans id='Posts'>Posts</Trans></h1>
            <Select
              name="form-field-name"
              value={value}
              onChange={this.handleChange}
              options={[
                { value: 'date', label: 'Date' },
                { value: 'votes', label: 'Votes' },
              ]}
            />
            <div className='space-between'>
              <div className='row'>
                {this.renderPosts(posts)}
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
 *  {import} categories: loaded categories
 */
function mapStateToProps (state) {
  return {
    categories: state.retrieve.categories,
    posts: state.retrieve.allPosts
  }
}

/**
 * @description Get the props from the store state
 * @param {object} dispatch
 * @returns {object}
 *  {func} loadAction: dispatch the retrieveAttempt reducer
 */
function mapDispatchToProps (dispatch) {
  return {
    loadAction: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Category)
