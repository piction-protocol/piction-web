import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router'

import Spinner from 'components/atoms/Spinner';

import useCurrentUser from 'hooks/useCurrentUser';

interface LoginCheckerProps {
  redirect: string
}

const LoginChecker: React.FunctionComponent<LoginCheckerProps> = ({ redirect, children }) => {
  const { accessToken } = useCurrentUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (accessToken) return

    dispatch(replace(redirect, {
      redirectTo: encodeURIComponent(window.location.pathname + window.location.search),
    }))
  }, [accessToken, dispatch, redirect])

  if (!accessToken) {
    return <Spinner />
  }

  return <>{children}</>
}

export default LoginChecker 
export const withLoginChecker = (WrappedComponent: React.ComponentType, redirect = '/login') => (props: any) => (
  <LoginChecker redirect={redirect}>
    <WrappedComponent {...props} />
  </LoginChecker>
)
