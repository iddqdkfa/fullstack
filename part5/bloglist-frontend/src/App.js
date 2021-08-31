import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login' 
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlog';
import Togglable from './components/Togglable';
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('') 
  const [oldBlogs, setOldBlogs] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [newBlog, setNewBlog] = useState(null) 

  const blogFormRef = useRef()
  const dispatch = useDispatch()


  const generateId = () =>
    Math.floor(Math.random() * 1000000)
  
  const createBlog = (blog) => {
      return {
        type: 'ADD_BLOG',
        data: {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: 0,
          user: blog.user,
          id: generateId()
        }
      }
    }

    const loginUser = (data) => {
      console.log("Logged in user data is")
      return {
        type: 'LOGIN_USER',
        data
      }
    }
    const logoutUser = () => {
      console.log("Logging out yser a is")
      return {
        type: 'LOGOUT_USER',
        data: null
      }
    }

    const createError = () => {
      return {
        type: 'ADD_ERROR',
        data: null
      }
    }

    const removeError = () => {
      return {
        type: 'REMOVE_ERROR',
        data: null
      }
    }




    const allBlogs = useSelector(state => state.blogs)
    const loggedInUser1 = useSelector(state => state.user)
    const loggedInUser = loggedInUser1[0]
    const errorMessages = useSelector( state => state.error)

    console.log("loggined user is", loggedInUser)

  useEffect(async () => {    
    const loggedUserJSON = window.localStorage.getItem('user')   
    console.log("User is", loggedUserJSON) 
    if (loggedUserJSON) {      
      console.log("Stored has value")
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))    
     // setUser(user)      
      blogService.setToken(user.token)  
      console.log("Loggin redux is", loggedInUser)  
      const oldBlogsTemp = await blogService.getAll()
      setOldBlogs(oldBlogsTemp)
      console.log("OLD blogs are", oldBlogs)
      setBlogs(allBlogs)
    }  
  }, [])

  useEffect(async () => {
  }, [allBlogs])

  const handleLogin = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password) 
    


    try {      
      const user = await loginService.login({ username, password}) 
      console.log("User is", user);   
      window.localStorage.setItem('user', JSON.stringify(user))   
      dispatch(loginUser(user))    
      // setUser(user)  
      setUsername('')      
      setPassword('')    
      getBlogs(user);
      console.log("Finished setting blog")
    } catch (exception) {      
      console.log("In catch of login")
      dispatch(createError())
     // setErrorMessage('Wrong credentials')      
      setTimeout(() => {    
        dispatch(removeError())    
        //setErrorMessage(null)      
      }, 5000)    
    } 
   }

   const handleCreate = async (event) => {    
    event.preventDefault()    
    try {      
     // const newblog = await blogService.newBlog(title, author, url) 
     const tempNewBlog = {title, author, url, user: loggedInUser.username}
      dispatch(createBlog(tempNewBlog))
      setNewBlog(tempNewBlog)
     // getBlogs(user);
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {        
        setNewBlog(null)      
      }, 5000)
    } catch (exception) {      
      console.log("In catch of login")
      dispatch(createError())
      //setErrorMessage('Wrong credentials')      
      setTimeout(() => {        
        //setErrorMessage(null)   
        dispatch(removeError())
   
      }, 5000)    
    } 
   }


   const sortLikes = async () => {
     const blogs = await blogService.getAll();
     blogs.sort((a, b) =>   b.likes - a.likes)
     setBlogs(blogs)
   }


   const getBlogs = async (user) => {
    console.log("User in getblogs is", user)
    //blogService.setToken(user.token);
   // const blogs = await blogService.getAll();
    
    
    setBlogs(allBlogs);
   }

   const logout = (e) => {
    e.preventDefault();
     console.log("logout clicked")
     window.localStorage.removeItem('user')
     blogService.setToken(null)
     setBlogs([]);
     dispatch(logoutUser())
   //  setUser(null);
   }


   const succeedForm = () => {

    return(
      <div class="alert alert-primary" role="alert">
             <h4>A new blog {newBlog.title} has been created</h4>

      </div>
    )

  }

  const failedLoginForm = () => {

    return(
<div class="alert alert-danger" role="alert">
               <h4>Login unsuccessful</h4>

      </div>
    )

  }



   const blogForm = () => {
     console.log("Blogs is", blogs);

     return(
       <div> 

               <h2>blogs</h2>
              <h4>{loggedInUser && loggedInUser.name} is logged in</h4>
              <button onClick = {logout}>
  logout
</button>
<div className="holder">
      {allBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs = {allBlogs} />
      )}
      </div>
       </div>
     )

   }

   const loginForm = () =>{
     return(      <form onSubmit={handleLogin}>        
      <div>username            
        <input            
        type="text"            
        value={username}            
        name="Username"            
        onChange={({ target }) => setUsername(target.value)}
                  />
      </div>
      <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>        
        <button type="submit">login</button>      
        </form>)
   }
   console.log("TEST IS", loggedInUser === undefined)
   console.log("TEST IS", errorMessage)

  return (
    <div>


            {loggedInUser === undefined && errorMessages!= null && failedLoginForm()}
            {loggedInUser === undefined && loginForm()}
            {loggedInUser !== undefined && newBlog != null && succeedForm()}
            {loggedInUser !== undefined && blogForm()}
            {loggedInUser !== undefined && 
            <Togglable buttonLabel = "View2"  ref = {blogFormRef}>
            <NewBlogForm 
            handleCreate = {handleCreate}
            title = {title}
            setTitle  = {setTitle}
            author = {author}
            setAuthor = {setAuthor}
            url = {url}
            setUrl = {setUrl}
        
            />
          </Togglable> }
          
          {loggedInUser !== null &&
          <button className="sorted" onClick = {sortLikes}>Sort by likes</button>

            
            }

    </div>
  )
}

export default App