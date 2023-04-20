import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Comments = () => {
  const { id } = useParams()

  const blog = useSelector(({ blogs }) => {
    return blogs.find((b) => b.id === id)
  })

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm />
      {blog.comments.length === 0 ? (
        <p>no comments yet..</p>
      ) : (
        <Table striped>
          <tbody>
            {blog.comments.map((c) => (
              <tr key={c.id}>
                <td>{c.comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}
export default Comments
