import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider  } from 'react-redux'

const blogReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_BLOG':
          console.log("In create action", action.data)
        return [...state, action.data]
      case 'DELETE_BLOG':
          console.log("Action.data is", action.data);
          const newState = state.filter(blog => blog.id != action.data.id)
          return newState
        case 'LIKE_BLOG':
        console.log("Action.data in like", action.data);
        const newState2 = state.map(blog => {

            if(blog.id === action.data.id){
                blog.likes++
                return blog;
            }
            return blog


        } )
        return newState2
      default:
        return state
    }
  }

  const userReducer = (state = [], action) => {
      console.log("IN user reducer")
    switch (action.type) {
      case 'LOGIN_USER':
          console.log("In login USER action", action.data)

          if(state.length > 0){
              console.log("IN state length", state)
              return state;
          }
          console.log("OUtside of if", action.data)
          console.log([...state, action.data])
        return [...state, action.data]
        case 'LOGOUT_USER':
            return []
      default:
        return state
    }
  }

  const errorReducer = (state = null, action) => {
    console.log("IN user reducer")
  switch (action.type) {
      case 'ADD_ERROR':
          console.log("Adding error")
          return 'Wrong credentials'
      case 'REMOVE_ERROR' :
          return null
    default:
      return state
  }
}



  const reducer = combineReducers({  user: userReducer,  blogs: blogReducer, error: errorReducer})
const store = createStore(reducer)


ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'))