import React from 'react'

const Header =  (props) => {
  return (
    <div>
     <h1>{props.name}</h1>
     </div>
  )
}

const Part =  (props) => {
  return (
    <div>
     {props.part} {props.exercises}
     </div>
  )
}





const Content = (props) => {
  return (
    <div>
    <p>
      <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
    </p>
    <p>
    <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
    </p>
    <p>
    <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
    </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
    <Header course = {course}/>
    <Content parts = {course.parts}/>
    <Total parts = {course.parts}/>
    </div>

  )

}

export default App