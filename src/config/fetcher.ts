import axios from 'axios';
import { ConfigInterface } from 'swr';

export const swrConfig: ConfigInterface = {
  onErrorRetry: (error, key, option, revalidate, { retryCount = 0 }) => {
    if (retryCount >= 3) return
    if (error.response && error.response.status === 404) return

    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
  },
}

export default function createFetcher(accessToken: string | null) {
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
