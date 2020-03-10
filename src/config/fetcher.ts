import axios from 'axios';

export default function createFetcher(accessToken: string) {
  return async function fetcher(args: any) {
    const API = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'https://api-stg.piction.network/',
      headers: {
        'X-Auth-Token': accessToken,
        'X-Device-Platform': 'web',
        accept: 'application/vnd.piction.v1+json',
      },
    });
    const res = await API.get(args);
    return res.data;
  };
}
