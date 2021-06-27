import { NextPage } from 'next'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))
const Index: NextPage = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.toolbar} />
      MyContent will be shifted downwards by the div above. If you remove the div, your content will
      disappear under the app bar.
    </>
  )
}

const Body = () => {
  return <div>hoge</div>
}

export default Index
