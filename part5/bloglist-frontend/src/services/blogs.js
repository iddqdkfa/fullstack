import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'


const baseUrl = 'http://localhost:3003/api/users'
const postUrl = 'http://localhost:3003/api/blogs'



let token = null

const setToken = (newToken) => {  
  token = `bearer ${newToken}`
}


const getAll = async () => {

  console.log("Token in get is", token);

  const config = {    
    headers: 
    { Authorization: token }
  } 

  const request = await axios.get(baseUrl, config )
  console.log("Request data is", request.data);
  return request.data
}

const newBlog = async (title, author, url) => {

  const blog = {title: title,
                author: author,
                url: url,

    }

  console.log("Token in get is", token);
  console.log("Blog in blog serivce is", blog);

  const config = {    
    headers: 
    { Authorization: token }
  } 

  const request = await axios.post(postUrl, blog, config )
  console.log("Request data is", request.data);
  return request.data
}


const like = async (title, author, url, likes, id) => {
  let newLikes = Number(likes) + 1

  const blog = {title: title,
                author: author,
                url: url,
                likes: newLikes    
    }

    console.log("Blog in blog service is", blog)

  console.log("Token in get is", token);
  console.log("Blog in blog serivce is", blog);

  const config = {    
    headers: 
    { Authorization: token }
  } 

  const newUrl = postUrl + "/" + id

  console.log("Url is", newUrl);

  const request = await axios.put(newUrl, blog, config )
  console.log("Request data is", request.data);
  return request.data
}

const deleteBlog = async (id) => {

  console.log("Token in get is", token);

  const config = {    
    headers: 
    { Authorization: token }
  } 


  const newUrl = postUrl + "/" + id

  console.log("Url is", newUrl);

  const request = await axios.delete(newUrl, config )
  console.log("Request data is", request.data);
  return request.data
}


export default { getAll, setToken, newBlog, like, deleteBlog}