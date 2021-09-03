import { FeedEvent, FeedsDocument, useUpdateFeedMutation } from '@/generated/graphql'

export const useFeedMutationHooks = () => {
  const [updateFeedFn] = useUpdateFeedMutation()

  const updatePlay = (id: string) => {
    return updateFeedFn({
      variables: {
        id: id,
        event: FeedEvent.Played,
      },
      update: (cache, newFeed) => {
        cache.writeQuery({
          query: FeedsDocument,
          data: {
            ...newFeed.data?.updateFeed,
          },
        })
      },
    })
  }

  const updateLike = (id: string) => {
    return updateFeedFn({
      variables: {
        id: id,
        event: FeedEvent.Liked,
      },
      update: (cache, newFeed) => {
        cache.writeQuery({
          query: FeedsDocument,
          data: {
            ...newFeed.data?.updateFeed,
          },
        })
      },
    })
  }

  const updateUnlike = (id: string) => {
    return updateFeedFn({
      variables: {
        id: id,
        event: FeedEvent.Unliked,
      },
      update: (cache, newFeed) => {
        cache.writeQuery({
          query: FeedsDocument,
          data: {
            ...newFeed.data?.updateFeed,
          },
        })
      },
    })
  }

  const updateStar = (id: string) => {
    return updateFeedFn({
      variables: {
        id: id,
        event: FeedEvent.Stared,
      },
      update: (cache, newFeed) => {
        cache.writeQuery({
          query: FeedsDocument,
          data: {
            ...newFeed.data?.updateFeed,
          },
        })
      },
    })
  }

  const updateUnstar = (id: string) => {
    return updateFeedFn({
      variables: {
        id: id,
        event: FeedEvent.Unstared,
      },
      update: (cache, newFeed) => {
        cache.writeQuery({
          query: FeedsDocument,
          data: {
            ...newFeed.data?.updateFeed,
          },
        })
      },
    })
  }

  return { updatePlay, updateLike, updateUnlike, updateStar, updateUnstar }
}
