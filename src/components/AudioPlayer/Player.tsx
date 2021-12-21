import { Button, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Forward10Icon from '@material-ui/icons/Forward10'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import Replay10Icon from '@material-ui/icons/Replay10'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import StopIcon from '@material-ui/icons/Stop'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import { dropWhile, head, includes, pathOr, tail } from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import { Handles, Rail, Slider, Tracks } from 'react-compound-slider'

import { Handle, SliderRail, Track } from '@/components/AudioPlayer/Slider'
import PlaybackRateMeter from '@/components/Filters/PlaybackRateMeter'
import { AudioFragment } from '@/generated/graphql'
import { HTMLMediaControls, HTMLMediaState } from '@/hooks/useAudioControls'

const keycode = {
  enter: 13,
  escape: 27,
  space: 32,
  arrowLeft: 37,
  arrowRight: 39,
}

type PlayerProps = {
  activeAudio: AudioFragment
  state: HTMLMediaState
  controls: HTMLMediaControls
  title: string
  start?: number
  end?: number
  captureKeyboardInput?: boolean
  next: () => void
  prev: () => void
}

const toSliderValue = (seconds: number) => Math.round(seconds * 100)
const toSeconds = (value: number) => value / 100

const useStyles = makeStyles((theme) => ({
  root2: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
    width: '100%',
    height: 86,
    backgroundColor: '#fff',
    userSelect: 'none',
    zIndex: 999,
  },
  root: {
    width: 1236,
    margin: '0 auto',
    height: '100%',
  },
  sliderWrapper: {
    // height: 120,
    width: 500,
  },
  slider: {
    position: 'relative',
    width: '100%',
  },
  timeLabel: {
    padding: theme.spacing(1),
    color: '#313c46',
  },
}))

const formatNumber = (num: number) => (num < 10 ? `0${num}` : num)

const formatHrMinSec = (seconds: number, shorten = false): string => {
  const hrMinSec = [
    Math.max(Math.floor(seconds / 3600), 0),
    Math.max(Math.floor((seconds % 3600) / 60), 0),
    Math.max(Math.floor((seconds % 3600) % 60), 0),
  ]

  if (!shorten) {
    return hrMinSec.map(formatNumber).join(':')
  }

  const trimStart = dropWhile((value) => value === 0, hrMinSec)
  if (trimStart.length === 0) {
    return '0:00'
  }
  if (trimStart.length === 1) {
    return `0:${formatNumber(head(trimStart)!)}`
  }
  return `${head(trimStart)}:${tail(trimStart).map(formatNumber).join(':')}`
}

const Player: React.FC<PlayerProps> = ({
  activeAudio,
  captureKeyboardInput = true,
  start = 0,
  end,
  state,
  controls,
  next,
  prev,
}) => {
  const classes = useStyles()
  const { duration, isPlaying, time, muted } = state
  const [isSeeking, setIsSeeking] = useState<{ isPlaying: boolean } | null>(null)

  const togglePlayback = useCallback(() => {
    if (!state.isPlaying) {
      console.log('togglePlayback play', isPlaying)
      controls.play()
    } else {
      console.log('togglePlayback pause  ', isPlaying)
      controls.pause()
    }
  }, [state.isPlaying])

  useEffect(() => {
    const handleKeyboardControls = (e: KeyboardEvent) => {
      if (
        includes(pathOr('', ['target', 'nodeName'], e).toLowerCase(), [
          'input',
          'textarea',
          'select',
          'button',
        ]) ||
        !captureKeyboardInput
      ) {
        return
      }

      switch (e.keyCode) {
        case keycode.space:
          e.preventDefault()
          console.log('keycode.space')
          togglePlayback()
          return
        case keycode.arrowLeft:
          e.preventDefault()
          console.log('arrowLeft')
          state.canPlay && controls.seekRelative(-10)
          return
        case keycode.arrowRight:
          e.preventDefault()
          console.log('arrowRight')
          state.canPlay && controls.seekRelative(10)
          return
      }
    }
    window.addEventListener('keydown', handleKeyboardControls)

    return () => {
      window.removeEventListener('keydown', handleKeyboardControls)
    }
    // }, [canPlay, captureKeyboardInput, togglePlayback, controls.seekRelative, controls])
  }, [captureKeyboardInput, state.isPlaying, togglePlayback])

  const updatePlayBackRate = (speed: number) => {
    controls.updatePlayBackRate(speed)
  }

  console.log(activeAudio.name)

  return (
    <div className={classes.root2}>
      <Grid
        classes={{ root: classes.root }}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {/*<Grid item xs={12} container justify="center" alignItems="center">*/}
        {/*  <Typography variant="caption">{activeAudio.name}</Typography>*/}
        {/*</Grid>*/}
        <Grid item xs={12} container justify="center" alignItems="center">
          <Typography variant="caption">{activeAudio.name}</Typography>
          <PlaybackRateMeter changeRate={updatePlayBackRate} />
          {state.muted ? (
            <IconButton aria-label="volume off" onClick={(e) => controls.unmute()}>
              <VolumeOffIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="volume on" onClick={(e) => controls.mute()}>
              <VolumeUpIcon />
            </IconButton>
          )}
          <IconButton aria-label="replay" onClick={(e) => controls.seekRelative(-10)}>
            <Replay10Icon />
          </IconButton>
          <IconButton aria-label="previous" onClick={(e) => prev()}>
            <SkipPreviousIcon />
          </IconButton>
          {state.isPlaying ? (
            <Button>
              <StopIcon
                onClick={(e) => {
                  e.stopPropagation()
                  controls.pause()
                }}
              />
            </Button>
          ) : (
            <Button>
              <PlayArrowIcon
                onClick={(e) => {
                  e.stopPropagation()
                  controls.play()
                }}
              />
            </Button>
          )}
          <IconButton aria-label="next" onClick={(e) => next()}>
            <SkipNextIcon />
          </IconButton>
          <IconButton aria-label="forword" onClick={(e) => controls.seekRelative(10)}>
            <Forward10Icon />
          </IconButton>
        </Grid>
        <div className={classes.sliderWrapper}>
          <Slider
            className={classes.slider}
            domain={[toSliderValue(start), toSliderValue(end || duration)]}
            step={1}
            values={[toSliderValue(time)]}
            onChange={([value]) => {
              controls.seek(toSeconds(value))
              if (isSeeking && isSeeking.isPlaying) {
                controls.play()
              }
              setIsSeeking(null)
            }}
            onUpdate={([value]) => {
              console.log(toSeconds(value))
              // TODO: setTimeのactionを用意する
              // setTime(toSeconds(value))
            }}
            onSlideStart={() => {
              setIsSeeking({ isPlaying })
              controls.pause()
            }}
          >
            <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div>
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      // className={styles.track}
                      // style={{ width: `${target.percent}%` }}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>

            <Handles>
              {({ activeHandleID, handles, getHandleProps }) => (
                <div>
                  {handles.map((handle) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[toSliderValue(start), toSliderValue(end || duration)]}
                      activeHandleID={activeHandleID}
                      getHandleProps={getHandleProps}
                      duration={duration}
                      time={time}
                    />
                  ))}
                </div>
              )}
            </Handles>
          </Slider>
        </div>
        <div className={classes.timeLabel}>
          {formatHrMinSec(time - start)} / {formatHrMinSec((end || duration) - start)}
        </div>
      </Grid>
    </div>
  )
}

export default Player
