import { Box, Button, TextField, Typography } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FieldConfig, useField, useFormikContext } from 'formik'
import { ChangeEvent, FC, memo, useState } from 'react'

type Props = FieldConfig &
  TextFieldProps & {
    defaultURL?: string
    description?: string
    // setFieldValue(field: string, value: any, shouldValidate?: boolean | undefined): void
  }

const useStyles = makeStyles((theme) => {
  return {
    description: {
      marginTop: 60,
      fontSize: 12,
      lineHeight: '18px',
      pointerEvents: 'none',
    },
    uploader: {
      display: 'inline-block',
      // width: 128,
      // height: 128,
      marginRight: 20,
      cursor: 'pointer',
      backgroundImage: 'url("/images/upload-image.png")',
      whiteSpace: 'pre-wrap',
      textAlign: 'center',
      '&:hover': {
        opacity: 0.7,
      },
    },
    field: {
      margin: theme.spacing(1, 0),
    },
  }
})

const FormikImageUpload: FC<Props> = ({ name, defaultURL, description, ...props }) => {
  const styles = useStyles()
  const { setFieldValue } = useFormikContext()

  const [preview, setPreview] = useState<string | undefined>()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = e
    getFileDuration(e)
    if (validity.valid && !!files) {
      const upload = files[0]
      setFieldValue(name, upload)
      getPreview(upload)
    }
  }

  const getPreview = (file: File) => {
    const reader = new FileReader()
    reader.addEventListener('loadend', () => {
      setPreview(reader.result?.toString())
    })

    reader.readAsDataURL(file)
  }

  const getFileDuration = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = e
    if (validity.valid && !!files) {
      const file = files[0]
      const mime = file.type
      const rd = new FileReader()
      const fileEl = document.querySelector('input')

      return new Promise((resolve, reject) => {
        try {
          // tslint:disable-next-line:no-shadowed-variable
          rd.onload = function (e) {
            const blob = new Blob([(e.target as any).result], { type: mime })
            const url = URL.createObjectURL(blob)
            const video = document.createElement('audio')
            video.preload = 'metadata'
            video.addEventListener('loadedmetadata', function () {
              console.log('video.duration', video.duration)
              resolve(video.duration)
            })
            video.src = url
          }
          rd.readAsArrayBuffer(file)
        } catch (err) {
          reject(1)
        }
      })
    }
  }

  return (
    <Box>
      <label htmlFor={'image-uploader'} className={styles.uploader}>
        <Button size="large" variant="outlined" color="primary">
          Audioファイル選択
        </Button>
        aiueo
      </label>
      {/*<TextField*/}
      {/*  {...field}*/}
      {/*  {...props}*/}
      {/*  type="file"*/}
      {/*  // accept=*/}
      {/*  // name={name}*/}
      {/*  onChange={onChange}*/}
      {/*  hidden*/}
      {/*  id={'image-uploader'}*/}
      {/*/>*/}
      <input
        type="file"
        accept="audio/*"
        name={name}
        onChange={onChange}
        hidden
        id="image-uploader"
      />
    </Box>
  )
}

export const FileInputField = ({ name }: { name: string }) => {
  const [field] = useField(name)
  const classes = useStyles()
  return (
    <div className={classes.field}>
      <input type="file" accept="image/*" id={name} {...field} />
    </div>
  )
}

export default memo(FormikImageUpload)
