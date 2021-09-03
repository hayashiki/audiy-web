import { AudiosDocument, useCreatePlayMutation } from '@/generated/graphql'

export const usePlayMutationHook = () => {
  const [createPlayFn] = useCreatePlayMutation()

  const createPlay = (id: string) => {
    return createPlayFn({
      variables: {
        audioID: id,
      },
      update: (cache, newPlayd) => {
        cache.writeQuery({
          query: AudiosDocument,
          data: {
            ...newPlayd.data?.createPlay?.audio,
          },
        })
      },
    })
  }

  return { createPlay }
}
