import { useEffect, useState } from 'react'

import {
  AudioEdgesFragment,
  AudioFragment,
  AudioOrder,
  Query,
  useAudiosQuery,
} from '@/generated/graphql'

export type FetchMore = {
  fetchMoreResult?: Query
}

export const useMoreAudio = (sort: AudioOrder) => {
  const {
    data,
    loading,
    error,
    fetchMore: fetchMoreFn,
    refetch: refetchFn,
  } = useAudiosQuery({
    variables: { cursor: '', order: sort },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  })
  const [fetchingMore, setFetchingMore] = useState(false)
  const [activeAudio, setActiveAudio] = useState<AudioFragment | null>(null)

  let audios: AudioFragment[] = []
  let hasMore = false
  let cursor: string
  if (data) {
    audios = data.audios.edges.map((edge) => edge!.node)
    if (sort == AudioOrder.PublishedAtDesc) {
      audios.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    } else {
      audios.sort((a, b) => (a.publishedAt > b.publishedAt ? 1 : -1))
    }
    hasMore = data.audios.pageInfo.hasMore
    cursor = data.audios.pageInfo.cursor
  }

  useEffect(() => {
    console.log('debug', data, loading)
    if (data && !loading) {
      const audios = data?.audios.edges.map((edge) => edge!.node)
      if (audios.length > 0) {
        setActiveAudio(audios[0])
      }
    }
  }, [data, loading])
  // const setActiveAudioFn = (r: AudioFragment) => {
  //   setActiveAudio(r)
  // }

  const fetchMore = async () => {
    setFetchingMore(true)
    return fetchMoreFn({
      variables: {
        cursor: cursor,
      },
      updateQuery: (prev: any, { fetchMoreResult }: FetchMore) => {
        const previousTaskEdges = prev.audios.edges as AudioEdgesFragment[]
        const newTaskEdges = fetchMoreResult?.audios.edges as AudioEdgesFragment[]
        return {
          ...prev,
          // ...fetchMoreResult, <- これだとネストしたオブジェクトがマージされない
          audios: {
            edges: [...previousTaskEdges, ...newTaskEdges],
            pageInfo: fetchMoreResult!.audios.pageInfo,
          },
        }
      },
    }).then(() => setFetchingMore(false))
  }

  return {
    audios,
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
