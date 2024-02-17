const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>{props.part1} {props.part2}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.count1 + props.count2 + props.count3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={exercises1} />
      <Content part1={part2} part2={exercises2} />
      <Content part1={part3} part2={exercises3} />
      <Total count1={exercises1} count2={exercises2} count3={exercises3} />
    </div>
  )
}

export default App
