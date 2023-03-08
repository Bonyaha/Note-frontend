import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  let request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  console.log(`get token: ${token}`)
  const config = {
    headers: { Authorization: token },
  }
  console.log('test')
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const delMany = async (noteIds) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}`, { data: { ids: noteIds }, ...config })
}

export default {
  getAll,
  create,
  update,
  delMany,
  setToken,
}
