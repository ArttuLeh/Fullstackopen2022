import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {
  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      refetchOnWindowFocus: false,
      retry: 2
    }
  )
  console.log(result)

  if (result.isLoading) {
    return <div>loading data..</div>
  }
  if (result.isError) {
    return  <div>anecdote service is not available due to problem with server</div>
  }
  
  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    
    </div>
  )
}

export default App
