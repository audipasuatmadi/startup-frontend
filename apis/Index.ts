import Axios from 'axios';

const baseURL = 'http://localhost:8000/api'
// const baseURL: 'https://jsonplaceholder.typicode.com'

const axios = Axios.create({baseURL})

export default axios