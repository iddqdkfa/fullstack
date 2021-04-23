  
  const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {
      case 'FILTER':
      return action.filter

      default: return ""
    }
  
    return state
  }
  
  export const createFilter = (anecdote) => {
      console.log("Inside create filter")
    return {
      type: 'FILTER',
      filter: anecdote
    }
  }
  
  
  
  
  export default filterReducer