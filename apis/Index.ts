import Axios from 'axios';

const baseURL = 'http://localhost:8001/api'
// const baseURL = 'https://jsonplaceholder.typicode.com'
Axios.defaults.withCredentials = true;
const axios = Axios.create({baseURL})

export default axios