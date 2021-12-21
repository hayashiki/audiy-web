import { Box, Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { AudioDetail } from '@/components/Audio/AudioDetail/AudioDetail'
import Player from '@/components/AudioPlayer/Player'
import CommentList from '@/components/Comment/CommentList'
import { Loading } from '@/components/Common/Loading'
import SortFilter from '@/components/Filters/SortFilter'
import StatusFilter from '@/components/Filters/StatusFilter'
import { AudioFragment, AudioOrder, FeedFragment, useUpdateFeedMutation } from '@/generated/graphql'
import { useAudioControls } from '@/hooks/useAudioControls'
import { useCommentsQueryHook } from '@/hooks/useComment'
import { useFeedMutationHooks } from '@/hooks/useFeedMutation'

type SimpleAudioProps = {
  activeAudio: AudioFragment
  audios: AudioFragment[]
  feeds: FeedFragment[]
  onSelect: (activeAudio: AudioFragment) => Promise<void>
  hasMore?: boolean
  fetchMore: () => void
  fetchingMore: boolean
  sort?: AudioOrder
}

const useStyles = makeStyles((theme) => ({
  list: {
    height: 'calc(90vh - 104px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

const AudioContainer: React.FC<SimpleAudioProps> = ({
  audios,
  feeds,
  activeAudio,
  onSelect,
  hasMore,
  fetchMore,
  fetchingMore,
  sort,
}: SimpleAudioProps) => {
  const classes = useStyles()
  const { audio, controls, state } = useAudioControls(activeAudio)
  const { updatePlay, updateLike, updateUnlike, updateStar, updateUnstar } = useFeedMutationHooks()

  const { comments } = useCommentsQueryHook(activeAudio)

  const likeUpdate = async (id: string, exists: boolean) => {
    if (exists) {
      await updateUnlike(id)
    } else {
      await updateLike(id)
    }
  }

  const starUpdate = async (id: string, exists: boolean) => {
    if (exists) {
      await updateUnstar(id)
    } else {
      await updateStar(id)
    }
  }

  const next = () => {
    const currentAudioIndex = audios.findIndex((a) => a.id == activeAudio.id)
    if (sort == AudioOrder.PublishedAtDesc) {
      const nextAudio = audios[currentAudioIndex + 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    } else {
      const nextAudio = audios[currentAudioIndex - 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    }
  }

  const prev = () => {
    const currentAudioIndex = audios.findIndex((a) => a.id == activeAudio.id)
    if (sort == AudioOrder.PublishedAtAsc) {
      const nextAudio = audios[currentAudioIndex + 1]
      onSelect(nextAudio).then(() => nextAutoPlay())
    } else {
      const nextAudio = audios[currentAudioIndex - 1]
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
    await updatePlay(activeAudio.id)
  }

  // const renderList = useCallback(() => {
  //   return audios.map((a: AudioFragment) => (
  //     <AudioDetail
  //       audio={a}
  //       activeAudio={activeAudio!}
  //       onSelect={onSelect}
  //       controls={controls}
  //       state={state}
  //     />
  //   ))
  // }, [audios, activeAudio])

  useEffect(() => {
    if (state.ended) {
      played()
      const currentAudioIndex = audios.findIndex((a) => a.id == activeAudio.id)
      if (sort == AudioOrder.PublishedAtDesc) {
        const nextAudio = audios[currentAudioIndex + 1]
        console.log('nextAudio', nextAudio)
        onSelect(nextAudio).then(() => nextAutoPlay())
      } else {
        const nextAudio = audios[currentAudioIndex - 1]
        onSelect(nextAudio).then(() => nextAutoPlay())
      }
    } else {
      console.info('end')
    }
  }, [state.ended])

  const isMd = true
  const THRESHOLD = 600

  return (
    <>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={8} className={classes.list}>
          <Box display="flex" justifyContent="space-between" p={1} mb={1}>
            <StatusFilter />
            <SortFilter />
          </Box>
          {/*<Grid container spacing={isMd ? 4 : 2} direction="column">*/}
          {/*<InfiniteScroll*/}
          {/*  hasMore={hasMore}*/}
          {/*  loadMore={fetchMore}*/}
          {/*  // useWindow={false}*/}
          {/*  threshold={THRESHOLD}*/}
          {/*  // css={{*/}
          {/*  //   display: 'flex',*/}
          {/*  //   flexDirection: 'column',*/}
          {/*  //   marginBottom: 20,*/}
          {/*  //   // [mq[1]]: {*/}
          {/*  //   //   display: 'grid',*/}
          {/*  //   //   marginTop: 36,*/}
          {/*  //   //   gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',*/}
          {/*  //   //   gridGap: 20,*/}
          {/*  //   // },*/}
          {/*  // }}*/}
          {/*  loader={<Loading />}*/}
          {/*>*/}
          {feeds.map((f) => (
            <AudioDetail
              key={f.id}
              feed={f}
              activeAudio={activeAudio!}
              onSelect={onSelect}
              state={state}
              controls={controls}
              starUpdate={starUpdate}
              likeUpdate={likeUpdate}
            />
          ))}
          {/*</InfiniteScroll>*/}

          {hasMore && (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <Button
                onClick={fetchMore}
                color="primary"
                variant="contained"
                disabled={fetchingMore}
              >
                Load more
              </Button>
            </Box>
          )}
          {/*</Grid>*/}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant={'body2'}>Comment Area / {activeAudio.name}</Typography>
          <Divider />
          <CommentList comments={comments} activeAudio={activeAudio} />
        </Grid>
      </Grid>

      {state.canPlay && (
        <Player
          activeAudio={activeAudio}
          state={state}
          controls={controls}
          next={next}
          prev={prev}
          title={activeAudio.name}
        />
      )}
      {audio}
    </>
  )
}

export default AudioContainer
