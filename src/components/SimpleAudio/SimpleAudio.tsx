import React, { useCallback, useContext } from 'react'
import { AudioFragment } from '@/generated/graphql'
import { useAudio } from '@/hooks/useAudio'
import { useReactiveVar } from '@apollo/client'
import { audioVar } from '@/lib/apollo'
import { Typography } from '@material-ui/core'
import { AudioDetailWithCtrl } from '@/components/Audio/AudioDetail/AudioDetailWithCtrl'

type SimpleAudioProps = {
  activeAudio: AudioFragment
  audios: AudioFragment[]
  onSelect: (activeAudio: any) => void
}

const SimpleAudio: React.FC<SimpleAudioProps> = ({
  audios,
  activeAudio,
  onSelect,
}: SimpleAudioProps) => {
  const audioCache = useReactiveVar(audioVar)
  const { audio, controls } = useAudio(activeAudio)

  const renderList = useCallback(() => {
    return audios.map((a: AudioFragment) => (
      <AudioDetailWithCtrl
        audio={a}
        activeAudio={activeAudio!}
        onSelect={onSelect}
        controls={controls}
      />
    ))
  }, [audios, activeAudio])

  return (
    <div>
      {renderList()}
      <div>{activeAudio.name}</div>
      <div onClick={() => controls.play()}>start</div>
      <div onClick={() => controls.pause()}>stop</div>
      {audio}
    </div>
  )
}

export default SimpleAudio
