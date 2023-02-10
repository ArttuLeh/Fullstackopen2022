import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
   const [blogs, setBlogs] = useState([])
   const [user, setUser] = useState(null)
   const [errorMessage, setErrorMessage] = useState(null)

   useEffect(() => {
      console.log('useEffect..')
      blogService.getAll().then(blogs =>
         setBlogs(blogs))
   },[])

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         setUser(user)
         blogService.setToken(user.token)
      }
   },[])

   const addBlog = async (blogObject) => {
      try {
         blogFromRef.current.toggleVisibility()
         const blog = await blogService.create(blogObject)
         setBlogs(blogs.concat(blog))
         setErrorMessage(`a new blog '${blog.title}' by '${blog.author}'`)
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      } catch (exception) {
         setErrorMessage(`${exception.response.data.error}`)
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   const addLike = async id => {
      const findBlog = blogs.find(b => b.id === id)
      const updateBlog = { ...findBlog, likes: findBlog.likes + 1 }
      try {
         const updatedBlog = await blogService.update(updateBlog, id)
         setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
         setErrorMessage('like succefully added')
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      } catch (exception) {
         setErrorMessage(`${exception.response.data.error}`)
         console.log(exception)
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   const removeBlog = async id => {
      const blog = blogs.find(blog => blog.id === id)
      try {
         await blogService.remove(id)
         setBlogs(blogs.filter(blog => blog.id !== id))
         window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      } catch (exception) {
         setErrorMessage(`${exception.response.data.error}`)
         console.log(exception)
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   const handleLogin = async (loginObject) => {
      try {
         const user = await loginService.login(loginObject)
         window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
         )
         blogService.setToken(user.token)
         setUser(user)
      } catch (exception) {
         setErrorMessage('wrong username or password')
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   const logOut = () => {
      window.localStorage.clear()
      setUser(null)
   }

   const blogFromRef = useRef()

   return (
      <div>
         <h2>Blogs</h2>
         <Notification message={errorMessage} />
         {user === null ?
            <Togglable buttonLabel='Login' >
               <LoginForm
                  handleLogin={handleLogin}
               />
            </Togglable> :
            <div>
               <p>{user.name} is logged in <button onClick={() => logOut()}>logout</button></p>
               <Togglable buttonLabel='New blog' ref={blogFromRef}>
                  <BlogForm
                     createBlog={addBlog}
                  />
               </Togglable>
               {blogs
                  .sort((a,b) => b.likes - a.likes)
                  .map(blog =>
                     <Blog key={blog.id}
                        blog={blog}
                        handleLike={addLike}
                        handleRemove={removeBlog}
                        user={user}
                     />
                  )
               }
            </div>
         }
         <Footer />
      </div>
   )
}
export default App