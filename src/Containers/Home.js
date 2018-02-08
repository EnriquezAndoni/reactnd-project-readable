import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'

// Style
import './Styles/bootstrap.css'
import './Styles/style.css'

class Home extends Component {
    /**
     * @description Initialize the state
     * @constructor
     */
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    if (this.props.categories === null) this.props.retrieveHome()
  }

  /*
  renderCategories = (categories) => {
    let render = []
    if (categories !== null) {
      for (const category of categories) {
        render.push(
          <div key={category.name} className='col-lg-3 col-md-4 col-sm-6 portfolio-item'>
            <div className='card h-100'>
              <Link to={category.path}>
                <img className='card-img-top' src={Images[category.name]} alt='' />
              </Link>
            </div>
          </div>
        )
      }
    }


    <div className='about-tre'>
        <div className='a-1'>
          <div className='col-md-6 abt-left'>
            <a href='single.html'><img src='images/c-3.jpg' alt='' /></a>
            <h6>Find The Most</h6>
            <h3><a href='single.html'>Tasty Coffee</a></h3>
            <p>Vivamus interdum diam diam, non faucibus tortor consequat vitae. Proin sit amet augue sed massa pellentesque viverra. Suspendisse iaculis purus eget est pretium aliquam ut sed diam.</p>
            <label>May 29, 2015</label>
          </div>
          <div className='col-md-6 abt-left'>
            <a href='single.html'><img src='images/c-4.jpg' alt='' /></a>
            <h6>Find The Most</h6>
            <h3><a href='single.html'>Tasty Coffee</a></h3>
            <p>Vivamus interdum diam diam, non faucibus tortor consequat vitae. Proin sit amet augue sed massa pellentesque viverra. Suspendisse iaculis purus eget est pretium aliquam ut sed diam.</p>
            <label>May 29, 2015</label>
          </div>
          <div className='clearfix' />
        </div>
      </div>


    return render
  }
  */


renderCategories = (categories) => {
  let render = []
  if (categories !== null) {
    categories.categories.forEach(category => {
      render.push(
        <div className='might-grid' key={category.name}>
          <div className='might-top'>
            <h4><a href='single.html'>{category.name}</a></h4>
            <p>Find the best post related to this category.</p>
          </div>
          <div className='clearfix' />
        </div>
      )
    })
  }

  return render
}


  renderPost = (categories) => {
    let render = []
    if (categories !== null) {
      for (const category of categories) {
        render.push(
          <div className='abt-2' key={category.name}>
            <h3>YOU MIGHT ALSO LIKE</h3>

          </div>
        )
      }
    }
    return render
  }

    /**
     * @description Render the component
     */
  render () {

    const { categories, allPosts } = this.props

    return (
      <div className='about'>
        <div className='container'>
          <div className='about-main'>
            <div className='col-md-8 about-left'>
              <div className='about-one'>
                <p>Best</p>
                <h3>Posts</h3>
              </div>

            </div>
            <div className='col-md-4 about-right heading'>
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
    allPosts: state.retrieve.allPosts
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
    retrieveHome: () => dispatch(RetrieveActions.retrieveHomeRequest())
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home)
