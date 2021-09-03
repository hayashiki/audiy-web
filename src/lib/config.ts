import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = publicRuntimeConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID
export const NEXT_PUBLIC_GQL_URL = publicRuntimeConfig.NEXT_PUBLIC_GQL_URL
