import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import {
  AudioEdgesFragment,
  AudioFragment,
  AudiosQuery,
  useAudiosLazyQuery,
} from '@/generated/graphql'
import { Button, Grid, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { audioVar } from '@/lib/apollo'
import SimpleAudio from '@/components/SimpleAudio/SimpleAudio'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  toolbar: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))

const AudioListSample: NextPage = () => {
  const classes = useStyles()

  const [getAudios, { data, loading, fetchMore: fetchMoreFn }] = useAudiosLazyQuery()
  const [fetchingMore, setFetchingMore] = useState(false)
  const [activeAudio, setActiveAudio] = useState<AudioFragment | null>(null)

  useEffect(() => {
    getAudios({
      variables: { cursor: '', limit: 5 },
    })
  }, [getAudios])

  useEffect(() => {
    if (data) {
      const audios = data?.audios.edges.map((edge) => edge!.node)
      if (audios.length > 0) {
        setActiveAudio(audios[0])
      }
    }
  }, [data])

  const onSelect = (r: any) => {
    console.log(r)
    audioVar(r as AudioFragment)
    setActiveAudio(r as AudioFragment)
  }

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

  const audios = data?.audios.edges.map((edge) => edge!.node)

  return (
    <>
      <div className={classes.toolbar} />
      {activeAudio && (
        <SimpleAudio activeAudio={activeAudio} audios={audios!} onSelect={onSelect} />
      )}
      {data?.audios.pageInfo.hasMore && <Button onClick={fetchMore}>Load more</Button>}
    </>
  )
}

export default AudioListSample
