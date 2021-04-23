import { useSelector, useDispatch } from 'react-redux'
import React,  { useState, useEffect }  from 'react'
import {addVote} from '../reducers/anecdoteReducer'
import {notificationAnecdoteCreated, voteAdded, clear} from '../reducers/notificationReducer'



const AnecdoteList = (props) => {


  

    let  anecdotes = useSelector(state => 
      {
        if(state.filter == ""){
          return state.anecdote
        } else{
          console.log("Fitler inside is", state.filter)
          return state.anecdote.filter(a => {
            console.log("A is ", a.content)
            return a.content.includes(state.filter)})
        }

      console.log("State is", state)
      return state.anecdote
      })
    const dispatch = useDispatch()
   

  
    const vote = (anecdote) => {
      dispatch(addVote(anecdote.id))

      dispatch(voteAdded(anecdote.content, 5000))



      /*
      console.log('vote', anecdote.id)
      dispatch(addVote(anecdote.id))
      dispatch(voteAdded(anecdote.content))
      setTimeout(() => {
        dispatch(clear(''))
      }, 5000)

      */

      

    }

    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default AnecdoteList