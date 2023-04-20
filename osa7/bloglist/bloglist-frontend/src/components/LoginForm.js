import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username: username.value, password: password.value })
    resetUsername()
    resetPassword()
  }

  const handleLogin = (loginObject) => {
    dispatch(userLogin(loginObject))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control id="username" {...username} />
          <Form.Label>Password:</Form.Label>
          <Form.Control id="password" {...password} />
          <Button variant="dark" id="login-button" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
