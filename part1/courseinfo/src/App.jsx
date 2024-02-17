const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Part part1={part1.name} part2={part1.exercises} />
      <Part part1={part2.name} part2={part2.exercises} />
      <Part part1={part3.name} part2={part3.exercises} />
      <Total count1={part1.exercises} count2={part2.exercises} count3={part3.exercises} />
    </div>
  )
}

export default App
