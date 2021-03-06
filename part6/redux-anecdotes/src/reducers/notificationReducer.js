const notificationAtStart = "Hello, this is a notification"
  
let x = 0;
  
  const notificationReducer = (state = notificationAtStart, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {
      case 'NOTIFICATION_VOTE':
      return action.notification

      case 'NOTIFICATION_CREATE':
        return action.notification

     case 'CLEAR':
         return ""

    }
  
    return state
  }
  
  export const voteAdded = (notification, time) => {
    return async dispatch => {

      if(x != 0){
        clearTimeout(x)
      }
        
         x = setTimeout(() => {
            dispatch(clear(''))
          }, time)

          console.log("Notif x is ", x)
        dispatch({
            type: 'NOTIFICATION_VOTE',
            notification: 'You voted for ' + notification
        })

    }
  }

  /*
  export const voteAdded = (notification) => {
    return {
      type: 'NOTIFICATION_VOTE',
      notification: 'You voted for ' + notification
    }
  }

  */

  export const clear = (notification) => {
    return {
      type: 'CLEAR',
    }
  }

  export const notificationAnecdoteCreated = (notification) => {
    return {
      type: 'NOTIFICATION_CREATE',
      notification: 'You created a new anecdote: ' + notification
    }
  }


  
  
  
  
  
  export default notificationReducer