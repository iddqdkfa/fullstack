import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(a => a.id === action.data)
      anecdoteToChange.votes = anecdoteToChange.votes + 1;
      let arr2 = state.map(an =>
        an.id !== action.data? an : anecdoteToChange 
      )
      return arr2.sort((a, b) => b.votes - a.votes);
    case 'CREATE':
      let x = action.data.content
      let arr = [...state, asObject(x)]

      return arr.sort((a, b) => b.votes - a.votes);

      case 'INIT_ANECDOTES':      
      return action.data
       

    default: return state
  }

  return state
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log("Anecdotes new are", anecdotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    console.log("Anecdote is before sending to back end", anecdote)
    const newAnecdote = await anecdoteService.createNew(anecdote.content)
    console.log("New anecdote in dispatch isfdgh", newAnecdote)
    dispatch({
      type: 'CREATE',
      data: {
        content: newAnecdote.content
      }

    })

  }
}

export const addVote = (id) => {
  console.log("addingCote")

  const anecdote = anecdoteService.addVote(id)
  return async dispatch => {
    dispatch({type: 'VOTE',
    data:  id 
  })
  }
}




export default reducer