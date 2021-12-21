import { useEffect, useState } from 'react'

import {
  AudioFragment,
  AudioOrder,
  FeedEdgesFragment,
  FeedEvent,
  FeedFragment,
  useFeedsQuery,
} from '@/generated/graphql'
import { FetchMore } from '@/hooks/useAudioQuery'

export const useFeedQueryHooks = (sort: AudioOrder, filter: FeedEvent | null) => {
  const {
    data,
    loading,
    error,
    fetchMore: fetchMoreFn,
    refetch: refetchFn,
  } = useFeedsQuery({
    variables: { cursor: '', filter: filter, order: sort },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  })

  const [fetchingMore, setFetchingMore] = useState(false)
  const [activeAudio, setActiveAudio] = useState<AudioFragment | null>(null)

  let audios: AudioFragment[] = []
  let feeds: FeedFragment[] = []
  let hasMore = false
  let cursor: string
  if (data) {
    audios = data.feeds.edges.map((edge) => edge!.node.audio)
    if (sort == AudioOrder.PublishedAtDesc) {
      audios.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    } else {
      audios.sort((a, b) => (a.publishedAt > b.publishedAt ? 1 : -1))
    }

    feeds = data.feeds.edges.map((edge) => edge!.node)
    hasMore = data.feeds.pageInfo.hasMore
    cursor = data.feeds.pageInfo.cursor
  }

  useEffect(() => {
    if (data && !loading) {
      const audios = data?.feeds.edges.map((edge) => edge!.node.audio)
      if (audios.length > 0 && activeAudio == null) {
        setActiveAudio(audios[0])
      }
    }
  }, [data, loading])

  const fetchMore = async () => {
    setFetchingMore(true)

    return fetchMoreFn({
      variables: {
        cursor: cursor,
        filter: filter,
        order: sort,
      },
      updateQuery: (prev: any, { fetchMoreResult }: FetchMore) => {
        const previousFeedEdges = prev.feeds.edges as FeedEdgesFragment[]
        const newFeedEdges = fetchMoreResult?.feeds.edges as FeedEdgesFragment[]
        return {
          ...prev,
          feeds: {
            edges: [...previousFeedEdges, ...newFeedEdges],
            pageInfo: fetchMoreResult!.feeds.pageInfo,
          },
        }
      },
    }).then(() => setFetchingMore(false))
  }

  return {
    audios,
    feeds,
    activeAudio,
    loading,
    error,
    fetchMore,
    fetchingMore,
    hasMore,
    // cursor,
    setActiveAudio,
  }
}
