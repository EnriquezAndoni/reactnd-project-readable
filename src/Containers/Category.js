import React, { Component } from 'react'
import { connect } from 'react-redux'

// Translation
import { Trans } from 'lingui-react'

// Actions
import RetrieveActions from '../Redux/RetrieveRedux'

// Style
import './Styles/bootstrap.min.css'
import './Styles/CategoryStyles.css'
import { Images } from '../Theme'

class Category extends Component {
  /**
   * @description Initialize the state
   * @constructor
   */
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    this.props.loadCategories('')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories !== null) {
      this.setState({ categories: nextProps.categories })
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
          <div key={category.name} className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
            <div className="card h-100">
              <a className="image-link" href={category.path}>
                <img className="card-img-top" src={Images[category.name]} alt="" />
              </a>
            </div>
          </div>)
      }
    }

    return paint
  }

  /**
   * @description Render the component
   */
  render() {
    const { categories } = this.state
    return (
      <div className="content">
        <div className="container">
          <div className="header-sep">
          <h1 className="my-4"><Trans id='Categories'>Categories</Trans></h1>
            <div className="space-between">
              <div className="row">
                {this.renderCategories(categories)}
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
function mapStateToProps(state) {
  return {
    categories: state.retrieve.categories
  }
}

/**
 * @description Get the props from the store state
 * @param {object} dispatch
 * @returns {object}
 *  {func} loadCategories: dispatch the retrieveAttempt reducer
 */
function mapDispatchToProps(dispatch) {
  return {
    loadCategories: (parameters) => dispatch(RetrieveActions.retrieveAttempt(parameters))
  }
}

/**
 * @description Connect mapStateToProps, mapDispatchToProps and the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Category)
