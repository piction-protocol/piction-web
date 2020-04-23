import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'rootReducer'
import { 
  loginRequest,
  logoutRequest,
  fetchCurrentUserRequest,
  LoginPayload
} from 'modules/currentUser'

function useCurrentUser() {
  const dispatch = useDispatch()
  const { currentUser }= useSelector((state: RootState) => state)

  const requestFetchCurrentUser = useCallback(() => {
    dispatch(fetchCurrentUserRequest())
  }, [dispatch])

  const deleteSession = useCallback(() => {
    dispatch(logoutRequest())
  }, [dispatch])

  const requestAccessToken = useCallback((param: LoginPayload) => {
    dispatch(loginRequest(param))
  }, [dispatch])

  return {
    currentUser: currentUser.user,
    accessToken: currentUser.auth.accessToken,
    requestFetchCurrentUser,
    deleteSession,
    requestAccessToken,
    loginErrorMessage: currentUser.auth.error
  }
}

export default useCurrentUser
