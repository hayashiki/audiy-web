import { makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'

import AudioForm from '@/components/Audio/Form'
import BackButton from '@/components/Common/BackButton'
import { UploadAudioInput, useUploadAudioMutation } from '@/generated/graphql'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    height: '100%',
    width: '100%',
  },
  section2: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
    },
  },
  section: {
    background: '#fff',
    maxWidth: 1236,
    // height: '100vh',
    width: '100%',
    // width: '100vw',
    margin: '0 auto',
    padding: theme.spacing(3, 1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 2),
    },
  },
}))

const AudioNew: NextPage = () => {
  const classes = useStyles()

  const initValues = { file: undefined, description: '' }

  const [uploadAudio] = useUploadAudioMutation()

  const onSubmit = async (values: UploadAudioInput) => {
    console.log('parent submit', values)
    await uploadAudio({
      variables: {
        file: undefined,
        description: '',
      },
    })
  }

  const isMd = true

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <>
          <BackButton />
          <AudioForm initValues={initValues} onSubmit={onSubmit} />
        </>
      </section>
    </div>
  )
}

export default AudioNew
