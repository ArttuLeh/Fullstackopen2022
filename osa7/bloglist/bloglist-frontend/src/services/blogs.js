import axios from 'axios'
import userService from './user'
const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`,
    },
  }
}

const getAll = async (id) => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response.data
}
// eslint-disable-next-line
export default { getAll, create, update, remove }
