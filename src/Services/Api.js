import apisauce from 'apisauce'

// Constructor
const create = (baseURL = process.env.REACT_APP_BASE_URL) => {
  const token = Math.random().toString(36).substr(-8)

  // Create and configure an apisauce-based api object.
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getCategories = () => api.get('/categories')

  const getCategoryPost = (post) => api.get(`/category/${post}`)
  // A list of the API functions
  return {
    getCategories,
    getCategoryPost
  }
}

// Let's return back our create method as the default.
export default {
  create
}
