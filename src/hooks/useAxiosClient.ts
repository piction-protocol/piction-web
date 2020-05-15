import { useCookies } from 'react-cookie';
import axios from 'axios';

function useAxiosClient() {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://api-stg.piction.network/',
    headers: {
      'X-Auth-Token': accessToken,
      'X-Device-Platform': 'web',
      accept: 'application/vnd.piction.v1+json',
    },
  });

  return client;
}

export default useAxiosClient;