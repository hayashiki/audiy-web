export type UserInfo = {
  id: string
  name: string
  email: string
  imageUrl: string
}

export const ConvertToUser = (profile: gapi.auth2.BasicProfile) => {
  return {
    id: profile.getId(),
    name: profile.getName(),
    email: profile.getEmail(),
    imageUrl: profile.getImageUrl(),
  } as UserInfo
}
