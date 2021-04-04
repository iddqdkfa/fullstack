import React, { useState } from 'react'

const Button = ({setSelected}) => {
  return (
  <button onClick={() => setSelected(Math.floor(Math.random()*6))}> next anecdote </button>
)
  }
  const VoteButton = ({selected, setVotes, votes}) => {
    return (

    <button onClick={() => {

let number = selected
const copy = [...votes]
copy[number] += 1   

setVotes(copy)

    }}> vote </button>
  )
    }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const [selected, setSelected] = useState(0)

  const max = votes.indexOf(Math.max(...votes));
    console.log(max)
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p> has {votes[selected]} votes</p>
      <Button setSelected = {setSelected}/>
      <VoteButton selected = {selected} votes = {votes}  setVotes = {setVotes} />
      <h2>Anecdote with the most votes is </h2>
      <p>{anecdotes[max]}</p>
    </div>
  )
}

export default App