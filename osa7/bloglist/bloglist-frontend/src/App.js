import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Notification from './components/Notification'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import userService from './services/user'
import Togglable from './components/Togglable'
import BlogsList from './components/BlogsList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import { Container } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => {
    return login
  })

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(login(userFromStorage))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <h2>Blog app</h2>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <NavBar />
          <Routes>
            <Route>
              <Route path="/" element={<BlogsList />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
            </Route>
          </Routes>
        </div>
      )}
      <Footer />
    </Container>
  )
}
export default App
