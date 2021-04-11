import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
    console.log("Gonna post crednetials")
  const response = await axios.post(baseUrl, credentials)
  console.log("Came back from post crednetials", response.data)
  return response.data
}

export default { login }