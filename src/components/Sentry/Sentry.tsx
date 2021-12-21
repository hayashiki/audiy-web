import * as sentry from '@sentry/browser'
import { useEffect } from 'react'

import { UserInfo } from '@/types/userInfo'

export type SentryProps = {
  userInfo: UserInfo
}

const Sentry: ({ userInfo }: SentryProps) => null = ({ userInfo }: SentryProps) => {
  useEffect(() => {
    sentry.setUser({
      id: userInfo.id,
      email: userInfo.email,
      username: userInfo.name,
    })
  }, [userInfo])

  return null
}

export default Sentry
