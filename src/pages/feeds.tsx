import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { Loading } from '@/components/Common/Loading'
import AudioContainer from '@/components/SimpleAudio/AudioContainer'
import { AudioFragment, AudioOrder, FeedEvent } from '@/generated/graphql'
import { useFeedQueryHooks } from '@/hooks/useFeedQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.alternate.main,
  },
  section: {
    background: '#fff',
    maxWidth: 1236,
    // height: '100vh',
    width: '100%',
    // width: '100vw',
    margin: '0 auto',
    padding: theme.spacing(3, 1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 2),
    },
  },
  fullWidth: {
    maxWidth: '100%',
  },
  disablePadding: {
    padding: 0,
  },
  narrow: {
    maxWidth: 800,
  },

  textWhite: {
    color: 'white',
  },
}))

const getDefaultSort = (sort: string | string[] | undefined) => {
  return sort ? (sort as AudioOrder) : AudioOrder.PublishedAtDesc
}

const getFilter = (filter: string | string[] | undefined) => {
  return filter ? (filter as FeedEvent) : null
}

const FeedIndex: NextPage = () => {
  const router = useRouter()
  const classes = useStyles()

  const {
    activeAudio,
    audios,
    feeds,
    loading,
    fetchMore: fetchMoreFn,
    fetchingMore,
    hasMore,
    setActiveAudio,
  } = useFeedQueryHooks(getDefaultSort(router.query.sort), getFilter(router.query.filter))

  const onSelect = async (r: AudioFragment) => {
    await setActiveAudio(r)
  }

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        {activeAudio && (
          <AudioContainer
            activeAudio={activeAudio as AudioFragment}
            audios={audios} // 消したい
            feeds={feeds}
            onSelect={onSelect}
            fetchMore={fetchMoreFn}
            fetchingMore={fetchingMore}
            hasMore={hasMore}
            sort={getDefaultSort(router.query.sort)}
          />
        )}
        {loading && <Loading />}
      </section>
    </div>
  )
}

export default FeedIndex
