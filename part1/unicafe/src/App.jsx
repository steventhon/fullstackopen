import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad

  return (
    <>
      <Content text="good" count={good} />
      <Content text="neutral" count={neutral} />
      <Content text="bad" count={bad} />
      <Content text="all" count={all} />
      <Content text="average" count={(good - bad) / all} />
      <Content text="positive" count={good / all * 100} end="%"/>
    </>
  )
}

const Content = (props) => {
  return (
    <p>{props.text} {props.count} {props.end}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
