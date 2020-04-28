import { useState } from 'react'
import useSWR from 'swr'

interface Subscription {
  sponsor: {
    username: string
    picture: string
    loginId: string
  }
  membership: {
    level: number
    name: string
  }
  startedAt: number
  expireDate: number
}

interface SponsorListResponse {
  content: Subscription[]
  empty: boolean
  first: boolean
  totalElements: number
  number: number
  totalPages: number
}

function useSponsors(projectId: string | undefined) {
  const [page, setPage] = useState(1)
  const { data: sponsors } = useSWR<SponsorListResponse>(`/my/projects/${projectId}/sponsors?page=${page}`)

  return {
    sponsors,
    setPage
  }
}

export default useSponsors