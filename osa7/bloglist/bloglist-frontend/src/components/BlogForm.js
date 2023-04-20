import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ toggleRef }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const createBlog = (blog) => {
    toggleRef.current.toggleVisibility()
    dispatch(createNewBlog(blog))
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control id="title" {...title} />
          <Form.Label>Author:</Form.Label>
          <Form.Control id="author" {...author} />
          <Form.Label>Url:</Form.Label>
          <Form.Control id="url" {...url} />
          <Button variant="dark" id="create-button" type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
