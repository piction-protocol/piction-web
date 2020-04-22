import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SWRConfig } from 'swr';
import createFetcher from 'config/fetcher';

import useScrollRestoration from 'hooks/useScrollRestoration';
import useAlert from 'hooks/useAlert';
import useCurrentUser from 'hooks/useCurrentUser';

import { LayoutProvider } from 'context/LayoutContext';

import Alert from 'components/externals/Alert';

import Routes from './routes'

const swrConfig = {
  onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
    if (retryCount >= 3) return;
    if (error.response && error.response.status === 404) return;

    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
  },
};

function App() {
  const { accessToken, getCurrentUser } = useCurrentUser();
  const fetcher = createFetcher(accessToken);
  const { flash } = useAlert();
  const location = useLocation();

  useScrollRestoration()

  useEffect(() => {
    async function loading() {
      await getCurrentUser();
    }
    loading();
  }, [getCurrentUser]);

  useEffect(() => {
    const { SMPCTracking } = window;
    if (SMPCTracking) {
      SMPCTracking.active();
    }
  }, [location.pathname]);

  return (
    <div className="root">
      {flash.visible && (
        <Alert type={flash.type}>
          {flash.message}
        </Alert>
      )}
      <SWRConfig value={{ ...swrConfig, fetcher }}>
        <LayoutProvider>
          <Routes />
        </LayoutProvider>
      </SWRConfig>
    </div>
  );
}

export default App;
