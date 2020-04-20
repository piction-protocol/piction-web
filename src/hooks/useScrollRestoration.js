import { useEffect } from 'react';

const storeScroll = () => {
  sessionStorage.setItem(`@scroll-${window.history.location.key}`, JSON.stringify([window.scrollX, window.scrollY]));
};

const unlistenHistory = window.history.listen(({ location, action }) => {
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
