import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api-stg.piction.network/',
  headers: {
    'X-Device-Platform': 'web',
    accept: 'application/vnd.piction.v1+json',
  },
});

export default instance;