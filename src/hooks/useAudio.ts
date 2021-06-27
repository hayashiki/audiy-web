import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AudioFragment } from '@/generated/graphql'

export const useAudio = (activeAudio: AudioFragment) => {
  const ref = useRef<HTMLAudioElement>(null)
  const [id, setId] = useState<number>(0)
  const [isPlaying, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audio = useMemo(() => {
    return React.createElement('audio', {
      ref,
      src: activeAudio.url,
      controls: false,
      preload: 'metadata',
      onTimeUpdate: () => setTime(ref.current!.currentTime),
      onDurationChange: () => setDuration(ref.current!.duration),
    })
  }, [activeAudio])

  useEffect(() => {
    console.log(ref.current)
    if (!ref.current) return
    if (isPlaying) {
      ref.current
        .play()
        .then(() => {
          // setError(false);
        })
        .catch((error) => {
          setPlaying(false)
          // setError(true);
          console.log('AudioPlayer Error: ', error)
        })
    } else if (!isPlaying) {
      ref.current.pause()
    }
  }, [isPlaying, audio])

  return {
    audio,
    state: {
      isPlaying,
      time,
      duration,
    },
    controls: {
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
    },
  }
}
