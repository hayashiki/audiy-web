import { AudioFragment } from '@/generated/graphql'
import React from 'react'
import { ListItem } from '@material-ui/core'

type SimpleAudioProps = {
  audio: AudioFragment
  activeAudio: AudioFragment
  onSelect: (activeAudio: any) => void
  controls: any
}

export const AudioDetailWithCtrl = ({
  audio,
  activeAudio,
  onSelect,
  controls,
}: SimpleAudioProps) => {
  if (activeAudio.id == audio.id) {
    return (
      <ListItem key={audio.id}>
        <div onClick={() => onSelect(audio)}>{audio.name}</div>
        {activeAudio.id == audio.id && (
          <>
            <div onClick={() => controls.play()}>start</div>
            <div onClick={() => controls.pause()}>stop</div>
          </>
        )}
      </ListItem>
    )
  } else {
    return (
      <ListItem key={audio.id}>
        <div onClick={() => onSelect(audio)}>{audio.name}</div>
      </ListItem>
    )
  }
}
