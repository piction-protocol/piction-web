import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';

import createFetcher, { swrConfig } from 'config/fetcher';

import Routes from 'routes'
import useScrollRestoration from 'hooks/useScrollRestoration';
import useAlert from 'hooks/useAlert';
import useCurrentUser from 'hooks/useCurrentUser';

import { LayoutProvider } from 'context/LayoutContext';

import Alert from 'components/externals/Alert';

// TODO: extract to `tracking` module
// function useSMPCTracking() {
//   const location = useLocation()
//   useEffect(() => {
//     const { SMPCTracking } = window;
//     if (SMPCTracking) {
//       SMPCTracking.active();
//     }
//   }, [location.pathname]);
// }

function App() {
  const { accessToken, requestFetchCurrentUser} = useCurrentUser();

  const fetcher = createFetcher(accessToken);

  const { flash } = useAlert();

  useScrollRestoration()

  useEffect(() => {
    requestFetchCurrentUser();
  }, [requestFetchCurrentUser]);

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
