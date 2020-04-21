import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function useScrollRestoration() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);
}

export default useScrollRestoration;
