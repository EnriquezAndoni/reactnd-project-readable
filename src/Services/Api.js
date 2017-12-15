import apisauce from 'apisauce'

// Constructor
const create = (baseURL = process.env.REACT_APP_BASE_URL) => {

  // Create and configure an apisauce-based api object.
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // User Log In
  const postLogin = (username, password) => api.post('user/login', {username: username, password: password},
    {
      headers: {'Connection': 'keep-alive'}
    })

  // User Log Out
  const postLogout = (token) => api.post('user/logout', {},
    {
      headers: {'X-CSRF-Token': token}
    })

  // A list of the API functions
  return {
    postLogin,
    postLogout
  }
}

// Let's return back our create method as the default.
export default {
  create
}
