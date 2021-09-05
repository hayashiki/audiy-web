import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))

const ToolbarBottomLine = () => {
  const classes = useStyles()

  return <div className={classes.toolbar} />
}

export default ToolbarBottomLine
