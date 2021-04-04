import React from 'react'


const Course = ( {course, id} ) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
    
    const total = course.parts.reduce(reducer, 0)
    
      return (
        <div>
          <h1>{course.name}</h1>
          {course.parts.map(part => {
      return ( <p key={part.id} >{part.name} {part.exercises} </p>)
          }
    ) }
          <h4>Total of {total } exercises</h4>
        </div>
      )
    }

export default Course