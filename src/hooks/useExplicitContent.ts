import { useState, useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import moment from 'moment';

function useExplicitContent(project: { uri: string, adult: boolean } | undefined) {
  const [cookies, setCookie] = useCookies();
  const [isExplicitContent, setOverlay] = useState(false)

  useEffect(() => {
    if (project) {
      const consented: boolean = cookies[`no-warning-${project.uri}`]
      setOverlay(project && project.adult && !consented)
    }
  }, [project, cookies])

  const consentWithExplicitContent = useCallback(() => {
    if (project) {
      setOverlay(false)
      setCookie(`no-warning-${project.uri}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
    }
  }, [project, setCookie])

  return {
    isExplicitContent,
    consentWithExplicitContent
  }
}

export default useExplicitContent