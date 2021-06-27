import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { AudioEdgesFragment, AudiosQuery, useAudiosLazyQuery } from '@/generated/graphql'
import { Button, ListItem, Typography } from '@material-ui/core'

const AudioListSample: NextPage = () => {
  const [getAudios, { data, loading, fetchMore: fetchMoreFn }] = useAudiosLazyQuery()
  const [fetchingMore, setFetchingMore] = useState(false)

  useEffect(() => {
    getAudios({
      variables: { cursor: '', limit: 5 },
    })
  }, [getAudios])

  const renderList = useCallback(() => {
    if (loading) {
      return <div>loading</div>
    } else {
      if (!data || !data.audios.edges.length) {
        return <Typography>No Audios found...</Typography>
      }
    }
    const audios = data.audios.edges.map((edge) => edge!.node)
    audios.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    return audios.map((r) => <ListItem>{r.name}</ListItem>)
  }, [loading, data])

  const fetchMore = async () => {
    setFetchingMore(true)
    return fetchMoreFn!({
      variables: {
        cursor: data?.audios.pageInfo.cursor,
        limit: 5,
      },
      updateQuery: (prev: AudiosQuery, { fetchMoreResult }: any): AudiosQuery => {
        const previousAudioEdges = prev.audios.edges as AudioEdgesFragment[]
        const newAudioEdges = fetchMoreResult?.audios.edges as AudioEdgesFragment[]
        console.log(previousAudioEdges, newAudioEdges)
        return {
          ...prev,
          audios: {
            edges: [...previousAudioEdges, ...newAudioEdges],
            pageInfo: fetchMoreResult?.audios.pageInfo,
          },
        }
      },
    }).then(() => setFetchingMore(false))
  }
  return (
    <>
      {renderList()}
      {data?.audios.pageInfo.hasMore && <Button onClick={fetchMore}>Load more</Button>}
    </>
  )
}

export default AudioListSample
