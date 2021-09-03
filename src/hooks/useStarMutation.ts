import { AudiosDocument, useCreateStarMutation, useDeleteStarMutation } from '@/generated/graphql'

export const useStarMutationHook = () => {
  const [createStarFn] = useCreateStarMutation()
  const [deleteStarFn] = useDeleteStarMutation()

  const createStar = (id: string) => {
    return createStarFn({
      variables: {
        audioID: id,
      },
      update: (cache, newStard) => {
        cache.writeQuery({
          query: AudiosDocument,
          data: {
            ...newStard.data?.createStar?.audio,
          },
        })
      },
    })
  }

  const deleteStar = (id: string) => {
    return deleteStarFn({
      variables: {
        audioID: id,
      },
      update: (cache, newStared) => {
        cache.writeQuery({
          query: AudiosDocument,
          data: {
            ...newStared.data?.deleteStar?.audio,
          },
        })
      },
    })
  }

  return { createStar, deleteStar }
}
