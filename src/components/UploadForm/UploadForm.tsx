import { AirplanemodeInactive } from '@material-ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'

import { Progressbar } from '@/components/UploadForm/Progressbar'

interface selected {
  image: File
  label: string
  description: string
}

export const UploadForm: React.SFC = () => {
  const [uploadError, setUploadError] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [submitReady, setSubmitReady] = useState<boolean>(false)

  const addFileHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    console.log(e)

    console.log('submit init')
    const mediaTypes = ['image/png', 'image/jpeg', 'image/jpg']

    const targetFiles = e.target.files

    if (targetFiles !== null) {
      setFile(targetFiles[0])
      console.log('submit init end')
    }
    // if (selected && mediaTypes.includes(selected.image.type)) {
    // if (mediaTypes.includes(selected.image.type)) {
    //   setUploadError('')
    //   console.log('mediaTypesss', mediaTypes)
    //   setFile(file)
    // } else {
    //   setUploadError('Please select png or jpg images')
    //   setFile(null)
    // }
  }

  const onSubmitHandler: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    console.log('onSubmit', file)
    evt.preventDefault()
    if (file && title.length) setSubmitReady(true)
    else setSubmitReady(false)
  }

  return (
    <form>
      {file && (
        <div>
          <Progressbar file={file as File} setFile={setFile} setSubmitReady={setSubmitReady} />
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      )}
      <div>
        <label>File</label>
        {/*<input*/}
        {/*  type="file"*/}
        {/*  name="imageUpload"*/}
        {/*  id="imageUpload"*/}
        {/*  className="px-4 bg-transparent focus:outline-none"*/}
        {/*  onChange={addFileHandler}*/}
        {/*  required={true}*/}
        {/*/>*/}
        <input type="file" name="Upload" id="file-upload-form" onChange={addFileHandler} />

        <button className="App-uploadForm__btn" onClick={onSubmitHandler}>
          Upload
        </button>
      </div>
    </form>
  )
}
