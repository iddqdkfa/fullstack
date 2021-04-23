import { createStore, combineReducers, applyMiddleware, compose  } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer2 = combineReducers({  anecdote: reducer,  notification: notificationReducer, filter: filterReducer})

const store = createStore(reducer2, composeWithDevTools(applyMiddleware(thunk)))
console.log(store.getState())



export default store