import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  let request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((res) => res.data)
}
const del = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}
const delMany = () => {
  axios.delete(`${baseUrl}`)
}

export default {
  getAll,
  create,
  update,
  del,
  delMany,
  setToken,
}
