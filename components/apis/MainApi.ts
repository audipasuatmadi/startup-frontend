import axios from 'axios';

const baseURL = 'http://localhost:8000/api'
// const baseURL = 'https://jsonplaceholder.typicode.com'

export default axios.create({ baseURL });
