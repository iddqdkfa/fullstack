import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {voteAdded, clear} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const NewAnecdote = (props) => {
    const dispatch = useDispatch()
    
    const addAnecdote =  async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = '';

        const newAnecdote = await anecdoteService.createNew(anecdote)    
        console.log("New anexcdote is", newAnecdote)
        dispatch(voteAdded("Hello this is a test", 5000))
        dispatch(voteAdded(newAnecdote.content, 5000))


        dispatch(createAnecdote(newAnecdote))


      }

  return (
      <div>
      <h2>create new</h2>
      <form onSubmit = {addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
      </div>
  )
}

export default NewAnecdote