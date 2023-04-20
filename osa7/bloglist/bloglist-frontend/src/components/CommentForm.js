import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createNewComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const CommentForm = () => {
  const { reset: resetComment, ...comment } = useField('text')

  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector(({ blogs }) => {
    return blogs.find((b) => b.id === id)
  })

  const addComment = (event) => {
    event.preventDefault()
    createComment({ comment: comment.value })
    resetComment()
  }

  const createComment = (object) => {
    dispatch(createNewComment(object, id, blog))
  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <Form.Control {...comment} />
        <Button variant="dark" type="submit">
          Add comment
        </Button>
      </Form>
    </div>
  )
}
export default CommentForm
