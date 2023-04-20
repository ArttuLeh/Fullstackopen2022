import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentList from './CommentList'
import { Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const blog = useSelector(({ blogs }) => {
    return blogs.find((b) => b.id === id)
  })
  const user = useSelector(({ login }) => {
    return login
  })

  const navigate = useNavigate()

  const handleLike = (blog) => {
    dispatch(likeBlog(blog, blog.id))
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <Link>{blog.url}</Link>
      <li id="blogLike">
        {blog.likes}{' '}
        <Button variant="dark" onClick={() => handleLike(blog)}>
          like
        </Button>
      </li>
      <li>added by {blog.author}</li>
      {blog.user.username === user.username && (
        <Button variant="dark" onClick={() => handleRemove(blog)}>
          remove
        </Button>
      )}
      <CommentList />
    </div>
  )
}

export default Blog
