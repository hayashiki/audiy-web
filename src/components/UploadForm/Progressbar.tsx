import * as React from 'react'
import { useEffect } from 'react'

import useStorage from '@/hooks/useStorage'

type Props = {
  file: File
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setSubmitReady: React.Dispatch<React.SetStateAction<boolean>>
}

export const Progressbar: React.FC<Props> = ({ file, setFile, setSubmitReady }) => {
  console.log('profile', file)
  const { url, progress } = useStorage(file)

  //remove progress bar after file has finished uploading
  useEffect(() => {
    if (url) {
      setFile(null)
      setSubmitReady(false)
    }
  }, [url])

  return <div className="progress h-4 bg-gray-500" style={{ width: progress + '%' }}></div>
}
