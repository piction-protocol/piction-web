import { useState, useEffect } from 'react';
import useAPI from 'hooks/useAPI';

function useWallet() {
  const [wallet, setWallet] = useState({});
  const [API] = useAPI();
  const accessToken = API.token.get();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.my.wallet();
        setWallet(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken) {
      getData();
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return [wallet];
}

export default useWallet;
