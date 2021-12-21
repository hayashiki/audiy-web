import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AudioFragment } from '@/generated/graphql'
import { getStorageData } from '@/lib/localStorage'

export type HTMLMediaState = {
  isPlaying: boolean
  canPlay: boolean
  time: number
  duration: number
  fixedDuration: number
  ended: boolean
  muted: boolean
}

export type HTMLMediaControls = {
  play: () => Promise<void> | void
  pause: () => void
  mute: () => void
  unmute: () => void
  volume: (volume: number) => void
  seek: (time: number) => void
  seekRelative: (relativeTime: number) => void
  updatePlayBackRate: (rate: number) => void
}

export enum Keys {
  Muted = 'audio_player_is_muted',
  Rate = 'audio_player_rate',
}

export const useAudioControls = (activeAudio: AudioFragment) => {
  const ref = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [buffered, setBuffered] = useState([])
  const [time, setTime] = useState(0)
  const [rate, setRate] = useState(getStorageData(Keys.Rate, 1.0))
  const [muted, setMute] = useState(false)
  const [duration, setDuration] = useState(0)
  const [ended, setEnd] = useState<boolean>(false)
  const [canPlay, setCanPlay] = useState(false)
  const [fixedDuration, setFixedDuration] = useState(0)

  const getAuthUrl = (url: string) => {
    const authUserVal = document.cookie.replace(
      /(?:(?:^|.*;\s*)G_AUTHUSER_H\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    )
    return `${url}${authUserVal}`
  }

  const audio = useMemo(() => {
    return React.createElement('audio', {
      ref,
      src: getAuthUrl(activeAudio.url),
      controls: false,
      preload: 'metadata',
      onRateChange: () => onRateChange(),
      onLoadStart: () => onLoadStart(),
      onPlay: () => onPlay(),
      onPause: () => onPause(),
      onProgress: () => onProgress,
      onEnded: () => setEnd(true),
      onVolumeChange: () => onVolumechange(),
      onTimeUpdate: () => onTimeUpdate(),
      onDurationChange: () => onDurationChange(),
      onLoadedMetadata: () => onLoadedMetadata(),
    })
  }, [activeAudio])

  // muteしつづけて聞くか？聞かない
  // useEffect(() => {
  //   localStorage.setItem(Keys.Muted, JSON.stringify(muted))
  //   if (!ref.current) return
  //   ref.current.muted = muted
  // }, [muted])

  useEffect(() => {
    localStorage.setItem(Keys.Rate, JSON.stringify(rate))
    if (!ref.current) return
    ref.current.playbackRate = rate
  }, [rate])

  const onRateChange = () => {
    console.log('onRateChange')
    if (!ref.current) return
    setRate(ref.current!.playbackRate)
  }

  // 不要かも
  const onLoadStart = () => {
    // setCanPlay(false)
    // console.log('onLoadStart')
  }

  const onPlay = () => {
    if (!ref.current) return
    setEnd(false)
    setIsPlaying(true)
  }
  const onPause = () => {
    if (!ref.current) return
    setIsPlaying(false)
  }

  const onVolumechange = () => {
    if (!ref.current) return
    setMute(ref.current.muted)
  }

  const onDurationChange = () => {
    if (!ref.current) return
    setDuration(ref.current!.duration)
  }

  const onTimeUpdate = () => {
    if (!ref.current) return
    setTime(ref.current.currentTime)
  }

  const onLoadedMetadata = () => {
    if (!ref.current) return
    console.log('onLoaded')
    // setInitialState
    speedPlayBack(rate)
    setCanPlay(true)
    setFixedDuration(ref.current.duration)
  }

  const onProgress = useCallback(() => {
    console.log('onProgress')
    if (ref.current) {
      const elBuffered = ref.current.buffered
      setBuffered(
        Array(elBuffered.length)
          .fill(0)
          .reduce(
            (acc, _, i) => [...acc, { start: elBuffered.start(i), end: elBuffered.end(i) }],
            [],
          ),
      )
    }
  }, [setBuffered, ref])

  // playerのコントロールはuseCallbackで制御した、canPlayとの依存関係は呼び出し元で解決する
  // useEffect(() => {
  //   if (!ref.current) return
  //   if (isPlaying && canPlay) {
  //     ref.current
  //       .play()
  //       .then(() => {
  //         // setError(false);
  //       })
  //       .catch((error) => {
  //         setIsPlaying(false)
  //         // setError(true);
  //         console.error('AudioPlayer Error: ', error)
  //       })
  //   } else if (!isPlaying) {
  //     ref.current.pause()
  //   }
  // }, [isPlaying, canPlay, audio])

  const seek = useCallback(
    (time: number) => {
      const el = ref.current
      if (!ref.current) return
      time = Math.min(duration, Math.max(0, time))
      el!.currentTime = time
    },
    [duration, activeAudio],
  )

  // let lockPlay = false
  const play = useCallback(() => {
    ref.current && ref.current.play()
    // if (!ref.current) return
    //
    // if (!lockPlay) {
    //   const promise = ref.current.play()
    //   const isPromise = typeof promise === 'object'
    //
    //   if (isPromise) {
    //     lockPlay = true
    //     const resetLock = () => {
    //       lockPlay = false
    //     }
    //   }
    //   return promise
    // }
    // return undefined
  }, [ref, isPlaying])

  const pause = useCallback(() => {
    ref.current && ref.current.pause()
  }, [ref])

  const mute = useCallback(() => {
    if (!ref.current) return
    ref.current.muted = true
  }, [ref])

  const unmute = useCallback(() => {
    if (!ref.current) return
    ref.current.muted = false
  }, [ref])

  const speedPlayBack = useCallback(
    (speed: number) => {
      if (!ref.current) return
      ref.current!.playbackRate = speed
    },
    [ref],
  )

  const seekRelative = useCallback(
    (relativeTime: number) => {
      seek(ref.current!.currentTime + relativeTime)
    },
    [seek, ref],
  )

  return {
    audio,
    state: {
      isPlaying,
      canPlay,
      time,
      duration,
      ended,
      fixedDuration,
      muted,
    } as HTMLMediaState,
    controls: {
      play,
      pause,
      mute,
      unmute,
      seek,
      seekRelative,
      updatePlayBackRate: speedPlayBack,
    } as HTMLMediaControls,
  }
}
