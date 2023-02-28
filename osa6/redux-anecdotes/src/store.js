import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducre from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
   reducer: {
     anecdotes: anecdoteReducer,
     filter: filterReducre,
     notification: notificationReducer
   }
 })
console.log(store.getState())
export default store