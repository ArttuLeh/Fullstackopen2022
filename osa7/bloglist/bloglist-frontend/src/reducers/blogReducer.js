import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comment'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    update(state, action) {
      return state.map((s) => (s.id === action.payload.id ? action.payload : s))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((s) => s.id !== id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createNewBlog = (object) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(object)
      dispatch(addBlog(blog))
      dispatch(
        setNotification(`A new blog '${blog.title}' by '${blog.author}'`, 5)
      )
    } catch (error) {
      dispatch(setNotification('Title and url are required', 5))
    }
  }
}
export const likeBlog = (object) => {
  return async (dispatch) => {
    const id = object.id
    const toLike = { ...object, likes: object.likes + 1 }
    const blog = await blogService.update(toLike, id)
    dispatch(update(blog))
  }
}
export const deleteBlog = (object) => {
  return async (dispatch) => {
    await blogService.remove(object.id)
    dispatch(removeBlog(object.id))
  }
}
export const createNewComment = (object, id, blog) => {
  return async (dispatch) => {
    try {
      const comment = await commentService.create(object, id)
      blog = { ...blog, comments: [...blog.comments, comment] }
      dispatch(update(blog))
      dispatch(setNotification('A new comment added', 5))
    } catch (error) {
      dispatch(setNotification('Contents is required', 5))
    }
  }
}
export const { setBlogs, setComment, addBlog, update, removeBlog, addComment } =
  blogSlice.actions
export default blogSlice.reducer
