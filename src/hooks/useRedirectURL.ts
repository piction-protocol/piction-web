import { useSelector } from "react-redux"

import { RootState } from "rootReducer"

interface LocationState {
  redirectTo?: string
}

function useRedirectURL() {
  const location = useSelector((state: RootState) => state.router.location)
  const { redirectTo: redirectToFromState = "/" } = (location.state || {}) as LocationState 

  return decodeURIComponent(redirectToFromState)
}

export default useRedirectURL