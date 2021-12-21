import { initializeApp } from 'firebase/app'
import { User } from 'firebase/auth'

import config from '@/lib/firebase/config'
import { UserDTO } from '@/types/userInfo'

// Initialize Firebase
export const firebaseApp = initializeApp(config)

export default firebaseApp

export class UserMapper {
  public static mapToDTO(raw: User): UserDTO {
    const { uid, email, displayName, providerData, photoURL } = raw
    const provider = providerData[0].providerId

    return {
      uid,
      email,
      name: displayName,
      provider,
      photoURL: photoURL ?? undefined,
    }
  }
}
