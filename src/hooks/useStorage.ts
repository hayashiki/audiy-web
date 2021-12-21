import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'

import { FirebaseContext } from '@/lib/firebase'

const useStorage = (file: File) => {
  const firebase = useContext(FirebaseContext)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (file !== null) {
      console.log('file', file.name)
      const storageRef = ref(firebase.storage, 'root/' + file.name)

      uploadBytesResumable(storageRef, file).on(
        'state_changed',
        (snapshot) => {
          console.log("inpro")
          const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(percentage)
        },
        (err: Error) => {
          console.log("err")
          setError(err.message)
        },
        async () => {
          const url = await getDownloadURL(storageRef)
          console.log("url")
          setUrl(url)
        },
      )
    }
  }, [file])

  return { progress, url, error }
}

export default useStorage
