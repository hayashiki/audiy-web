import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ChatIcon from '@material-ui/icons/Chat'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import StopIcon from '@material-ui/icons/Stop'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import clsx from 'clsx'
import React from 'react'

import { AudioFragment, FeedFragment } from '@/generated/graphql'
import { HTMLMediaControls, HTMLMediaState } from '@/hooks/useAudioControls'

type SimpleAudioProps = {
  feed: FeedFragment
  activeAudio: AudioFragment
  onSelect: (activeAudio: AudioFragment) => void
  state: HTMLMediaState
  controls: HTMLMediaControls
  starUpdate: (id: string, exists: boolean) => void
  likeUpdate: (id: string, exists: boolean) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  card: {
    display: 'flex',
    cursor: 'pointer',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  active: {
    // TODO: 配色考える
    backgroundColor: 'rgb(247, 247, 247)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    // justifyContent: 'space-between',
    marginBottom: theme.spacing(0),
    '&:last-child': {
      marginBottom: 0,
      borderBottom: 0,
      paddingBottom: 0,
    },
  },
  cardSubContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlContent: {
    padding: theme.spacing(3),
  },
  controlButton: {
    // margin: theme.spacing(1),
    // borderRadius: '5em',
  },
  playIcon: {
    height: 38,
    width: 38,
    display: 'flex',
    alignItems: 'center',
  },
  cardHighlighted: {
    background: theme.palette.primary.dark,
  },
}))

export const AudioDetail = ({
  feed,
  activeAudio,
  onSelect,
  state,
  controls,
  starUpdate,
  likeUpdate,
}: SimpleAudioProps) => {
  const classes = useStyles()
  const renderButton = (isPlaying?: boolean) => {
    if (isPlaying == null || !isPlaying) {
      return (
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          color="secondary"
          badgeContent={feed.played ? 0 : ' '}
        >
          <PlayArrowIcon
            className={classes.playIcon}
            onClick={(e) => {
              controls.play()
            }}
          />
        </Badge>
      )
    } else
      return (
        <StopIcon
          className={classes.playIcon}
          onClick={(e) => {
            controls.pause()
          }}
        />
      )
  }
  const renderLikeButton = () => (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        likeUpdate(feed.audio.id, feed.liked)
      }}
      size="small"
    >
      {feed.liked ? (
        <Tooltip title="remove like" aria-label="remove like" placement="bottom">
          <ThumbUpIcon fontSize="small" />
        </Tooltip>
      ) : (
        <Tooltip title="add like" aria-label="add like" placement="bottom">
          <ThumbUpOutlinedIcon fontSize="small" />
        </Tooltip>
      )}
      {feed.audio.likeCount}
    </Button>
  )
  const renderStarButton = () => (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        starUpdate(feed.audio.id, feed.stared)
      }}
      size="small"
    >
      {feed.stared ? (
        <Tooltip title="remove bookmark" aria-label="remove bookmark" placement="bottom">
          <BookmarkIcon fontSize="small" />
        </Tooltip>
      ) : (
        <Tooltip title="add bookmark" aria-label="add bookmark" placement="bottom">
          <BookmarkBorderIcon fontSize="small" />
        </Tooltip>
      )}
    </Button>
  )

  return (
    <Grid
      item
      xs={12}
      key={feed.audio.publishedAt}
      onClick={() => onSelect(feed.audio)}
      className={classes.root}
    >
      <Card
        className={
          activeAudio.id == feed.audio.id ? clsx(classes.card, classes.active) : classes.card
        }
      >
        {activeAudio.id == feed.audio.id ? (
          <div className={classes.controlContent}>{renderButton(state.isPlaying)}</div>
        ) : (
          <div className={classes.controlContent}>{renderButton()}</div>
        )}
        <CardContent className={classes.cardContent}>
          <Grid container justify={'space-between'}>
            <Typography variant="subtitle1" color="textPrimary">
              {feed.audio.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(feed.audio.publishedAt).toLocaleString()}
            </Typography>
          </Grid>
          <div className={classes.cardSubContent}>
            <Grid container>
              {renderStarButton()}
              {renderLikeButton()}
              {feed.played && (
                <Box display="flex" alignItems="center">
                  <CheckCircleIcon />
                  <Typography variant={'caption'}>再生済み</Typography>
                </Box>
              )}
            </Grid>
            <Grid container justify={'flex-end'}>
              <Tooltip title="再生数" aria-label="再生数" placement="bottom">
                <ShowChartIcon fontSize="small" />
              </Tooltip>
              {feed.audio.playCount}
              <Tooltip title="コメント数" aria-label="コメント数" placement="bottom">
                <ChatIcon fontSize="small" />
              </Tooltip>
              {feed.audio.commentCount}
            </Grid>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}
