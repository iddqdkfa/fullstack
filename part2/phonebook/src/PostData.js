import axios from 'axios';

const baseUrl = '/api'

const addNumber = (newObject)  => {
    return axios.post(`${baseUrl}/new`, newObject)

};

const getAll = () => {
    return axios.get(`${baseUrl}/persons`)
  };



const deleteUser = (id) => {
    console.log(`${baseUrl}/delete/${id}`)
    const temp = axios.delete(`${baseUrl}/delete/${id}`)
    return temp.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }



  export default {
      addNumber,
      getAll,
      deleteUser,
      update
  }
