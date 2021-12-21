import * as sentry from '@sentry/browser'
import { useEffect } from 'react'

import { UserDTO, UserInfo } from '@/types/userInfo'

export type SentryProps = {
  userDTO: UserDTO
}

const Sentry: ({ userDTO }: SentryProps) => null = ({ userDTO }: SentryProps) => {
  useEffect(() => {
    if (userDTO.name && userDTO.email) {
      sentry.setUser({
        id: userDTO.uid,
        email: userDTO.email,
        username: userDTO.name,
      })
    }
  }, [userDTO])

  return null
}

export default Sentry
