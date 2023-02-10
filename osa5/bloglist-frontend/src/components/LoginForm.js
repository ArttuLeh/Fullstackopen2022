import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState ('')

   const handleSubmit = (event) => {
      event.preventDefault()
      handleLogin({ username, password })
      setUsername('')
      setPassword('')
   }

   return (
      <div>
         <h2>Log in to application</h2>
         <form onSubmit={handleSubmit}>
            <div>
               Username
               <input
                  type='text'
                  value={username}
                  id='username'
                  onChange={({ target }) => setUsername(target.value)}
               />
            </div>
            <div>
               Password
               <input
                  type='password'
                  value={password}
                  id='password'
                  onChange={({ target }) => setPassword(target.value)}
               />
            </div>
            <button id='login-button' type='submit'>Login</button>
         </form>
      </div>
   )
}

LoginForm.propTypes = {
   handleLogin: PropTypes.func.isRequired
}

export default LoginForm