import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const addVote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}` )
    response.data.votes = response.data.votes + 1
    await axios.put(`${baseUrl}/${id}`, response.data )
    console.log("Response from getting is", response.data.votes)
    return response.data
  }




const createNew = async (content) => 
{    const object = { content, votes: 0 }
const response = await axios.post(baseUrl, object)  
console.log("Return object from posting is", response)
return response.data
}

export default { getAll, createNew, addVote }