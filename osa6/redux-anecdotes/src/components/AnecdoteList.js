import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
   const anecdotes = useSelector(({ anecdotes, filter }) => {
      if (filter === '') {
         return anecdotes
      }
      return anecdotes.filter(anecdote =>
         anecdote.content.toLowerCase().includes(filter.toLowerCase()))
   })
   const dispatch = useDispatch()

   const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(addVote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
   }
   return (
      <div>
         {anecdotes
            .slice()
            .sort((a,b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
               <div>
                  {anecdote.content}
               </div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
               </div>
            </div>
         )}
      </div>
   )
}
export default AnecdoteList