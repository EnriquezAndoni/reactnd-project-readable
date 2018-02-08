import apisauce from 'apisauce'

// Constructor
const create = (baseURL = process.env.REACT_APP_BASE_URL) => {
  // const token = Math.random().toString(36).substr(-8)

  // Create and configure an apisauce-based api object.
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'token'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getCategories = () => api.get('/categories')

  const getAllPosts = () => api.get('/posts')

  const getCategoryPosts = (category) => api.get(`${category}/posts/`)

  const getPost = (id) => api.get(`/posts/${id}`)

  const getPostComments = (id) => api.get(`/posts/${id}/comments`)

  const uploadPost = (post) => api.post('/posts',
    {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    }, {})

  const uploadComment = (comment) => api.post('/comments',
    {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    }, {})

  const editComment = (comment) => api.put(`/comments/${comment.id}`,
    {
      timestamp: comment.timestamp,
      body: comment.body
    })

  const deleteComment = (id) => api.delete(`/comments/${id}`)

  const editPost = (post) => api.put(`/posts/${post.id}`,
    {
      title: post.title,
      body: post.body
    })

  const deletePost = (id) => api.delete(`/posts/${id}`)

  // A list of the API functions
  return {
    getCategories,
    getAllPosts,
    getCategoryPosts,
    getPost,
    getPostComments,
    uploadPost,
    uploadComment,
    editComment,
    deleteComment,
    editPost,
    deletePost
  }
}

// Let's return back our create method as the default.
export default {
  create
}
