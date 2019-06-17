import { useState, useEffect } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import axios from 'axios';

function useWallet() {
  const [wallet, setWallet] = useState({});
  const { accessToken } = useCurrentUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://api-iro.piction.network/my-wallet', {
          headers: {
            'X-Auth-Token': accessToken,
          },
        });
        setWallet(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [accessToken]);

  return [wallet];
}

export default useWallet;
