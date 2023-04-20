import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/user'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
  },
})

export const userLogin = (object) => {
  return async (dispatch) => {
    try {
      const { username, password } = object
      const user = await loginService.login({ username, password })
      userService.setUser(user)
      dispatch(login(user))
      dispatch(setNotification(`${username} logged in`, 5))
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }
}
export const userLogout = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(logout(null))
  }
}
export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
