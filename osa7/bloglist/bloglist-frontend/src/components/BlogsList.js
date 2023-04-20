import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { Table } from 'react-bootstrap'

const BlogsList = () => {
  const blogsToShow = useSelector(({ blogs }) => {
    return blogs
  })

  const blogFromRef = useRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFromRef}>
        <BlogForm toggleRef={blogFromRef} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogsToShow
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <tr key={blog.id}>
                <td className="blogs">
                  <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
                </td>
                <td className="blogAuthor">{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}
export default BlogsList
