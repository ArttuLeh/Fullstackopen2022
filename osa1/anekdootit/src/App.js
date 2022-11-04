import { useState } from 'react'

const Header = ({ headers }) => {
  return (
    <div>
      <h1>{headers}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({ selected }) => {
  return (
      <div>
        {selected}
      </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const headers = {
    first: 'Anecdotes of the day',
    second: 'Anecdotes with most votes'
  }
  
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0])

  const handleClick = () => {
    const selected = Math.floor(Math.random() * anecdotes.length)
    setSelected(selected)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  const mostVoted = vote.indexOf(Math.max(...vote))

  return (
    <div>
      <Header headers={headers.first}  />
      <Display selected={anecdotes[selected]} />
      {"Has " + vote[selected] + " votes"} <br />
      <Button handleClick={handleVote} text='Vote' />
      <Button handleClick={handleClick} text='Next anecdote' />
      <Header headers={headers.second}  />
      <Display selected={anecdotes[mostVoted]} />
      {"Has " + vote[mostVoted] + " votes"}
    </div>
    )
}

export default App
