import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notification(state, action) {
      return action.payload
    },
  },
})

export const { notification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    await dispatch(notification(message))
    setTimeout(() => dispatch(notification('')), timeout * 1000)
  }
}
export default notificationSlice.reducer
