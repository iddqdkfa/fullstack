import React from 'react'

const NewBlogForm = ({handleCreate, title, setTitle, author, setAuthor, url, setUrl, }) =>{
    return(      <form onSubmit={handleCreate}>        
     <div >title            
       <input 
       id="title"           
       type="text"            
       value={title}            
       name="Title"            
       onChange={({ target }) => setTitle(target.value)}
                 />
     </div>
     <div >Author            
       <input  id="author"          
       type="text"            
       value={author}            
       name="Author"            
       onChange={({ target }) => setAuthor(target.value)}
                 />
     </div>
     <div >
         Url
           <input
           id="url"
           type="text"
           value={url}
           name="Password"
           onChange={({ target }) => setUrl(target.value)}
           />
       </div>        
       <button id="submitButton" type="submit">Create</button>      
       </form>)
  }

  export default NewBlogForm