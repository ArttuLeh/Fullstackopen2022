import { useMutation, useQueryClient } from 'react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = ({ anecdotes }) => {
   const queryClient = useQueryClient()
   const dispatch = useNotificationDispatch()
   const byLikes = (b1, b2) => b2.votes > b1.votes ? 1 : -1

   const updateAnecdoteMutatuon = useMutation(updateAnecdote, {
      onSuccess: () => {
         queryClient.invalidateQueries('anecdotes')
      }
   })

   const handleVote = (anecdote) => {
      updateAnecdoteMutatuon.mutate({...anecdote, votes: anecdote.votes + 1})
      dispatch({ type: 'ADD_VOTE', state: `you voted '${anecdote.content}'` })
      setTimeout(() => {
         dispatch({ type: 'ADD_VOTE', state: '' })
      }, 5000)
   }

   return (
      <div>
         {anecdotes
            .sort(byLikes)
            .map(anecdote =>
            <div key={anecdote.id}>
            <div>
               {anecdote.content}
            </div>
            <div>
               has {anecdote.votes}
               <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
         )}
      </div>
   )
}
export default AnecdoteList