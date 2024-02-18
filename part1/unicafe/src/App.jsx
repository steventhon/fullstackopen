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

  const all = good + neutral + bad

  return (
    <>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Content text="good" count={good} />
      <Content text="neutral" count={neutral} />
      <Content text="bad" count={bad} />
      <Content text="all" count={all} />
      <Content text="average" count={(good - bad) / all} />
      <Content text="positive" count={good / all * 100} end="%"/>
    </>
  )
}

export default App
