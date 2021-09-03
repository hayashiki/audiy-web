import { AudiosDocument, useCreateLikeMutation, useDeleteLikeMutation } from '@/generated/graphql'

export const useLikeMutationHook = () => {
  const [createLikeFn] = useCreateLikeMutation()
  const [deleteLikeFn] = useDeleteLikeMutation()

  const createLike = (id: string) => {
    return createLikeFn({
      variables: {
        audioID: id,
      },
      update: (cache, newLiked) => {
        cache.writeQuery({
          query: AudiosDocument,
          data: {
            ...newLiked.data?.createLike?.audio,
          },
        })
      },
    })
  }

  const deleteLike = (id: string) => {
    return deleteLikeFn({
      variables: {
        audioID: id,
      },
      update: (cache, newLiked) => {
        cache.writeQuery({
          query: AudiosDocument,
          data: {
            ...newLiked.data?.deleteLike?.audio,
          },
        })
      },
    })
  }

  return { createLike, deleteLike }
}
