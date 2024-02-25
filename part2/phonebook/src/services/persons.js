import axios from 'axios'

const baseUri = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUri)
}

const create = (newObject) => {
    return axios.post(baseUri, newObject)
}

export default { getAll, create }