import { useEffect } from 'react';
import { globalHistory } from '@reach/router';

const storeScroll = () => {
  sessionStorage.setItem(`@scroll-${globalHistory.location.key}`, JSON.stringify([window.scrollX, window.scrollY]));
};

const unlistenHistory = globalHistory.listen(({ location, action }) => {
  if (action === 'POP' && sessionStorage[`@scroll-${location.key}`]) {
    window.scroll(...JSON.parse(sessionStorage[`@scroll-${location.key}`]));
  } else {
    window.scroll(0, 0);
  }
});

function useScrollRestoration() {
  useEffect(() => {
    window.addEventListener('scroll', storeScroll);

    return () => {
      unlistenHistory();
      window.removeEventListener('scroll', storeScroll);
    };
  }, []);
}

export default useScrollRestoration;
