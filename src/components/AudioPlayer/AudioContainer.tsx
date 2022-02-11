import { Box, Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useContext, useEffect } from 'react'

import { FeedDetail } from '@/components/Audio/AudioDetail/FeedDetail'
import Player from '@/components/AudioPlayer/Player'
import { AudioFragment, AudioOrder, FeedFragment, useUpdateFeedMutation } from '@/generated/graphql'
import { useAudioControls } from '@/hooks/useAudioControls'
import { useFeedMutationHooks } from '@/hooks/useFeedMutation'

type Props = {
  currentAudio: AudioFragment
  feeds: FeedFragment[]
  onSelect: (activeAudio: AudioFragment) => Promise<void>
  hasMore?: boolean
  fetchMore: () => void
  fetchingMore: boolean
  sort?: AudioOrder
}

const AudioPlayerContainer: React.FC<Props> = ({
  feeds,
  currentAudio,
  onSelect,
  hasMore,
  fetchMore,
  fetchingMore,
  sort,
}: Props) => {
  const classes = useStyles()
  const { audio, controls, state } = useAudioControls(currentAudio)
  const { updatePlay, updateLike, updateUnlike, updateStar, updateUnstar } = useFeedMutationHooks()

  const toggleLike = async (id: string, exists: boolean) => {
    if (exists) {
      await updateUnlike(id)
    } else {
      await updateLike(id)
    }
  }

  const toggleStar = async (id: string, exists: boolean) => {
    if (exists) {
      await updateUnstar(id)
    } else {
      await updateStar(id)
    }
  }

  const next = () => {
    const currentAudioIndex = feeds.map((f) => f.audio).findIndex((a) => a.id == currentAudio.id)
    if (sort == AudioOrder.PublishedAtDesc) {
      const nextAudio = feeds.map((f) => f.audio)[currentAudioIndex + 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    } else {
      const nextAudio = feeds.map((f) => f.audio)[currentAudioIndex - 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    }
  }

  const prev = () => {
    const currentAudioIndex = feeds.map((f) => f.audio).findIndex((a) => a.id == currentAudio.id)
    if (sort == AudioOrder.PublishedAtAsc) {
      const nextAudio = feeds.map((f) => f.audio)[currentAudioIndex + 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    } else {
      const nextAudio = feeds.map((f) => f.audio)[currentAudioIndex - 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    }
  }

  const nextAutoPlay = useCallback(() => {
    if (state.canPlay) {
      controls.play()
    }
  }, [state.canPlay])

  const played = async () => {
    console.log('played')
    await updatePlay(currentAudio.id)
  }

  useEffect(() => {
    if (state.ended) {
      played()
      const currentAudioIndex = feeds.map((f) => f.audio).findIndex((a) => a.id == currentAudio.id)
      if (sort == AudioOrder.PublishedAtDesc) {
        const nextAudio = feeds.map((f) => f.audio)[currentAudioIndex + 1]
        console.log('nextAudio', nextAudio)
        onSelect(nextAudio).then(() => nextAutoPlay())
      } else {
        const nextAudio = feeds.map((f) => f.audio)[currentAudioIndex - 1]
        onSelect(nextAudio).then(() => nextAutoPlay())
      }
    } else {
      console.info('end')
    }
  }, [state.ended])

  return (
    <>
      {feeds.map((f) => (
        <FeedDetail
          key={f.id}
          feed={f}
          currentAudio={currentAudio}
          onSelect={onSelect}
          state={state}
          controls={controls}
          toggleStar={toggleStar}
          toggleLike={toggleLike}
        />
      ))}

      {hasMore && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Button onClick={fetchMore} color="primary" variant="contained" disabled={fetchingMore}>
            Load more
          </Button>
        </Box>
      )}

      {state.canPlay && currentAudio && currentAudio.url && (
        <Player
          currentAudio={currentAudio}
          state={state}
          controls={controls}
          next={next}
          prev={prev}
          title={currentAudio.name}
        />
      )}
      {audio}
    </>
  )
}

export default AudioPlayerContainer
