import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login' 
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlog';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [newBlog, setNewBlog] = useState(null) 

  const blogFormRef = useRef()

  


  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('user')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)    
      console.log("use effect user is", user)  
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])

  useEffect(async () => {
    try{
      const blogs = await blogService.getAll()
      setBlogs(blogs)

    } catch{

    }

  }, [])

  const handleLogin = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  

    try {      
      const user = await loginService.login({ username, password}) 
      console.log("User is", user);   
      window.localStorage.setItem('user', JSON.stringify(user))   
       setUser(user)  
      setUsername('')      
      setPassword('')    
      getBlogs(user);
      console.log("Finished setting blog")
    } catch (exception) {      
      console.log("In catch of login")
      setErrorMessage('Wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    } 
   }

   const handleCreate = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  

    try {      
      const newblog = await blogService.newBlog(title, author, url) 
      console.log("New blog is", newblog)
      setNewBlog(newblog)
      console.log("User in create is", user) 
      getBlogs(user);
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {        
        setNewBlog(null)      
      }, 5000)
      console.log("Finished setting blog")
    } catch (exception) {      
      console.log("In catch of login")
      setErrorMessage('Wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    } 
   }


   const sortLikes = async () => {
     const blogs = await blogService.getAll();
     blogs.sort((a, b) =>   b.likes - a.likes)
     setBlogs(blogs)
   }


   const getBlogs = async (user) => {
    let blog = null;
    console.log("User in getblogs is", user)
    blogService.setToken(user.token);
    const blogs = await blogService.getAll();
    console.log("blogs is", blogs)
    
    
    setBlogs(blogs);
   }

   const logout = (e) => {
    e.preventDefault();
     console.log("logout clicked")
     window.localStorage.removeItem('user')
     blogService.setToken(null)
     setBlogs([]);
     setUser(null);
   }


   const succeedForm = () => {

    return(
      <div>
             <h4>A new blog {newBlog.title} has been created</h4>

      </div>
    )

  }

  const failedLoginForm = () => {

    return(
      <div className = "Error">
             <h4>Login unsuccessful</h4>

      </div>
    )

  }



   const blogForm = () => {
     console.log("Blogs is", blogs);

     return(
       <div> 

               <h2>blogs</h2>
              <h4>{user.name} is logged in</h4>
              <button onClick = {logout}>
  logout
</button>
<div className="holder">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs = {setBlogs} />
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

  return (
    <div>


            {user === null && errorMessage!= null && failedLoginForm()}
            {user === null && loginForm()}
            {user !== null && newBlog != null && succeedForm()}
            {user !== null && blogForm()}
            {user !== null && 
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
          
          {user !== null &&
          <button className="sorted" onClick = {sortLikes}>Sort by likes</button>

            
            }

    </div>
  )
}

export default App