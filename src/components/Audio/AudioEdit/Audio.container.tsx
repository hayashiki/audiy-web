import React, { useCallback } from 'react'

import { useCreateTranscriptMutation, useGetAudioQuery } from '@/generated/graphql'

type Props = {
  id: string
}

const AudioEditContainer = ({ id }: Props) => {
  const { data, loading } = useGetAudioQuery({
    variables: { id: id },
  })

  const [createTranscription] = useCreateTranscriptMutation({
    variables: {
      id: id,
    },
  })

  const handleSubmit = useCallback(async () => {
    await createTranscription()
  }, [])

  if (loading) {
    return <div>loading</div>
  }

  if (!data) {
    return <div>Not Found</div>
  }

  return (
    <>
      AudioEdit Page
      {data?.audio?.id} {data?.audio?.transcribed}
      <button onClick={() => handleSubmit()}>submit</button>
    </>
  )
}

export default AudioEditContainer
