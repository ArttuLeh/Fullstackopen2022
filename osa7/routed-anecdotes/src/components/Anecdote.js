import { Link } from 'react-router-dom'
const Anecdote = ({ anecdote, vote }) => {
   return (
     <div>
       <h2>{anecdote.content} by {anecdote.author}</h2>
       <p>has {anecdote.votes} votes <button onClick={() => vote(anecdote.id)}>vote</button></p>
       <p>for more info see <Link to={anecdote.info}>{anecdote.info}</Link></p>
     </div>
   )
 }
 export default Anecdote