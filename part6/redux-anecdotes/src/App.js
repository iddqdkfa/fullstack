import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import reducer, {initializeAnecdotes} from './reducers/anecdoteReducer'
import anecdoteService  from './services/anecdotes'



const App = () => {
  const dispatch = useDispatch()  
  useEffect(() => {    
 dispatch(initializeAnecdotes())
  }, [dispatch])



  return (
    <div>
      <Notification/>
     <h2>Anecdotes</h2>
     <Filter/>
     <AnecdoteList/>
    <AnecdoteForm/>
    </div>
  )
}

export default App