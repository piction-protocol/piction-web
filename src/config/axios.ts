import axios, { AxiosError } from 'axios';
import store from 'store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api-stg.piction.network/',
  headers: {
    'X-Device-Platform': 'web',
    accept: 'application/vnd.piction.v1+json',
  },
})

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response) {
    store.dispatch({type: 'ERROR', payload: error.response.data})
  }
  return Promise.reject(error)
})

export default instance;