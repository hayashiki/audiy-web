import { User } from 'firebase/auth'

export type UserInfo = {
  id: string
  name: string
  email: string
  imageUrl: string
}

export type UserDTO = {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoURL: string | undefined
}

export type FirebaseUser = User | null
