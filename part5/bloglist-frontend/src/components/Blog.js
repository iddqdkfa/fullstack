import React, { useState } from 'react'
import blogSerivce from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'


const Blog = ({ blog, setBlogs }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)  
const [hide, setHide] = useState('View')  
const [loginVisible, setLoginVisible] = useState(false)
const [newLike, setNewLike] = useState(blog.likes)



const hideWhenVisible = { display: loginVisible ? 'none' : '' }
const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const clickLogic = () => {
    console.log("Blog in click is", blog)
    if(!loginVisible){
      setHide('Hide')
    } else{
      setHide('View')
    }
    setLoginVisible(!loginVisible)

  }


  const like = async () => {
   // const response = await blogSerivce.like(blog.title, blog.author, blog.url, (newLike), blog.id)

    const likeBlogAction = (id) => {
      return {
        type: 'LIKE_BLOG',
        data: {
          id: id
        }
      }
    }

    dispatch(likeBlogAction(blog.id))


    setNewLike(blog.likes);


  }

  const deleteBlogAction = (id) => {
    return {
      type: 'DELETE_BLOG',
      data: {
        id: id
      }
    }
  }

  const deleteBlog = async () => {
    const result = window.confirm("Are you sure you want to delete this blog?");

    if(result){
     //const response = await blogSerivce.deleteBlog( blog.id)
     dispatch(deleteBlogAction(blog.id))
     // console.log("Blog deleted", response);
      //const blogs = await blogSerivce.getAll()
      //setBlogs(allBlogs)

    }



  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>      
    <div class="list-group-item">
        {blog.title} {blog.author}
        <button className = "viewableButton"   onClick = {clickLogic}>
          {hide}
        </button>
        <button className = "delete" onClick = {deleteBlog}>
          Delete
        </button>
      </div>
      <div className="togglableContent " style={showWhenVisible}>
        {blog.url} 
        Likes: { newLike} 
        <button className="likeButton" onClick = {like}>
          Like
        </button>
        </div>
  </div>
)}

export default Blog