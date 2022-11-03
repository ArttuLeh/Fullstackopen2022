
import { useState } from 'react';

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

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td><td>{value}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad, all, averageTotal, positive }) => {
  if (all !== 0) {
    return (
      <div>
        <table>
          <tbody>
          <tr><StatisticLine text='Good' value={good} /></tr>
          <tr><StatisticLine text='Neutral' value={neutral} /></tr>
          <tr><StatisticLine text='Bad' value={bad} /></tr>
          <tr><StatisticLine text='All' value={all} /></tr>
          <tr><StatisticLine text='Average' value={averageTotal} /></tr>
          <tr><StatisticLine text='Positive' value={positive} /></tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const App = () => {
  // talenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState([])

  const headers = {
    feedback: 'Give feedback',
    stats: 'Statistic'
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(average.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average.concat(-1))
  }

  const averageTotal = () => {
    return parseFloat(average.reduce((a, b) => a + b / all, 0)).toFixed(1)
  }
  
  const positive = () => {
    const result = parseFloat(good / all * 100)
    return result.toFixed(1) + ' %'
  } 

  return (
    <div>
      <Header headers={headers.feedback} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header headers={headers.stats} />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        averageTotal={averageTotal()} 
        positive={positive()} />
    </div>
  )
}

export default App
