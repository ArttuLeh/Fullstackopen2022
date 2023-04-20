import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector(({ users }) => {
    return users.find((u) => u.id === id)
  })

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <Table striped>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default User
