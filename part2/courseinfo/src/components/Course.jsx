const Header = (props) => {
    return (
      <h2>{props.text}</h2>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </>
    )
  }
  
  const Course = (props) => {
    const total = props.course.parts.reduce((acc, p) => {
      console.log('what is happening', acc, p)
      return acc + p.exercises
    }, 0,)
    return (
      <>
        <Header text={props.course.name} />
        <Content parts={props.course.parts} />
        <b>total of {total} exercises</b>
      </>
    )
  }

export default Course
