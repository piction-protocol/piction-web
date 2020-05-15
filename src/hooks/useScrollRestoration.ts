import { useEffect } from 'react'
import { RootState } from 'rootReducer'
import { useSelector } from 'react-redux'

function useScrollRestoration() {
  const { key, pathname } = useSelector((state: RootState) => state.router.location)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key, pathname])
}

export default useScrollRestoration