import React, { useState } from 'react'
import {useField} from '../src/hooks/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}


const SingleAnecdote = ( {anecdote} ) => (
  <div>
    <h2>{anecdote.content}</h2>
    <h4>Has {anecdote.votes} votes</h4>
    <h4>For more information see {anecdote.info}</h4>
  </div>
)

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');


const resetAll = (e) => {
  e.preventDefault()

  content.reset();
  author.reset();
  info.reset();
}



  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit called");
    let c = content.main.value;
    let a = author.main.value;
    let i = info.main.value;

    props.addNew({
      content: c,
      author: a,
      info: i,
      votes: 0
    })
    setTimeout( () => {
      props.setNotification('')
    }, 5000)
  props.setNotification("A new anecdote has been created", content)
    history.push('/')
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name={content.main.name} value={content.main.value} onChange={content.main.onChange} />
        </div>
        <div>
          author
          <input {...author.main} />
        </div>
        <div>
          url for more info
          <input {...info.main} />
        </div>
        <button>create</button>
        <button onClick = {resetAll}>restet</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const match = useRouteMatch('/anecdotes/:id') 

  
  const anecdote2 = match 
    ? anecdotes.find(note => note.id === match.params.id)
    : null
    



  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    


    <div>
      <h1>Software anecdotes</h1>
      <Menu />
<Switch>
<Route path="/create">
          <CreateNew addNew={addNew} setNotification = {setNotification} />
        </Route>
        <Route path="/anecdotes/:id">       
         <SingleAnecdote anecdote={anecdote2} />      
         </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} notification = {notification} />
        </Route>

</Switch>
<Footer />


    </div>
  )
}

export default App;