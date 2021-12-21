import { makeStyles } from '@material-ui/core'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBackTwoTone'
import { useRouter } from 'next/router'
import React, { memo, FC } from 'react'

const useStyles = makeStyles(({ spacing }) => ({
  btn: {
    marginBottom: spacing(2),
  },
}))

const BackButton: FC<IconButtonProps> = () => {
  const router = useRouter()
  const styles = useStyles()

  return (
    <IconButton className={styles.btn} color="primary" onClick={() => router.back()}>
      <BackIcon fontSize="small" />
    </IconButton>
  )
}

export default memo(BackButton)
