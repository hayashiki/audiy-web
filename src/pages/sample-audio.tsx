import { NextPage } from 'next'
import { useAudio } from '@/hooks/useAudio'
import { mockAudioData } from '@/components/Audio/AudioList/AudioText.example'
import { useAudios } from '@/hooks/useAudioQuery'
import SimpleAudio from '@/components/SimpleAudio/SimpleAudio'
import { AudioFragment } from '@/generated/graphql'
import { useContext, useEffect } from 'react'

const Index: NextPage = () => {
  const { loading, audios, activeAudio } = useAudios()
  // const [state, dispatch] = useContext<any>(AudioContext)
  // console.log(loading, audios, activeAudio)
  //
  // useEffect(() => {
  //   console.log('effect')
  //   console.log(activeAudio)
  //   if (activeAudio) {
  //     dispatch({
  //       type: 'SELECT_RADIO',
  //       payload: activeAudio,
  //     })
  //   }
  // }, [audios, activeAudio, dispatch])

  if (loading) {
    return <div>loading...</div>
  }
  if (activeAudio == null) {
    return <div>no audio...</div>
  }

  return (
    <div>

      hoge
      <br />
      <br />
      <br />
      <br />
      <SimpleAudio activeAudio={activeAudio as AudioFragment} />
    </div>
  )
}

export default Index
