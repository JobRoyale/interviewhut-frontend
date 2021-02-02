import axios from 'axios';

const clientURL = process.env.REACT_APP_CLIENT;
const userAPI = process.env.REACT_APP_USER_API;

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Origin', clientURL);
headers.append('Access-Control-Allow-Credentials', 'true');

const loggedOutAxios = axios.create({
  baseURL: userAPI,
  headers,
  withCredentials: true,
});

export default loggedOutAxios;
