import { NextPage } from 'next'
import { useRouter } from 'next/router'

import AudioEditContainer from '@/components/Audio/AudioEdit/Audio.container'

const AudioEdig: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  const idStr = id as string

  return <AudioEditContainer id={idStr} />
}

export default AudioEdig
