import { Avatar, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import CommentForm from '@/components/Comment/Form'
import { AudioFragment, CommentFragment, CreateCommentInput } from '@/generated/graphql'
import { useCommentMutationHook } from '@/hooks/useComment'

// set component styles
const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: 'scroll',
    height: 'calc(65vh - 104px)',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  chatInput: {
    minHeight: '94px',
    padding: theme.spacing(2),
  },
  chatMessage: {
    margin: theme.spacing(2),
  },
  chatMessageInner: {
    display: 'flex',
  },
  chatMessageAvatar: {
    position: 'relative',
    display: 'inline-block',
    width: 24,
    height: 24,
    marginRight: theme.spacing(2),
  },
  chatMessageBubble: {
    display: 'inline-block',
    flexGrow: 1,
    marginRight: 'auto',
    background: '#fff',
    // color: theme.palette.text.primary,
    borderRadius: 3,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}))

type CommentComponentType = {
  key: any
  name: string
  message: string
  time: string
  avatar: string
}

const CommentDetail = ({ name, message, time, avatar }: CommentComponentType) => {
  const classes = useStyles()

  return (
    <div className={classes.chatMessage}>
      <div className={classes.chatMessageInner}>
        <Avatar className={classes.chatMessageAvatar} alt="Lucy Lavender" src={avatar} />
        <div className={classes.chatMessageBubble}>
          {/*<Box>*/}
          {/*  <Typography variant="body1">{name}</Typography>*/}
          {/*</Box>*/}
          <Typography variant="body2">{message}</Typography>
          <Typography variant="body2">{new Date(time).toLocaleString()}</Typography>
        </div>
      </div>
    </div>
  )
}

type CommentListProps = {
  comments: CommentFragment[]
  activeAudio: AudioFragment
}

const CommentList = ({ comments, activeAudio }: CommentListProps) => {
  const classes = useStyles()
  const { createComment } = useCommentMutationHook()

  const handleSubmit = async (values: CreateCommentInput) => {
    values.audioID = activeAudio.id
    await createComment(values)
  }

  const initValues = { body: '', audioID: activeAudio.id } as CreateCommentInput

  return (
    <Grid item xs={12}>
      <div className={classes.paper}>
        {comments.map((c) => (
          <CommentDetail
            key={c.id}
            name={c.user.name}
            avatar={c.user.photoURL}
            message={c.body}
            time={c.createdAt}
          />
        ))}
      </div>
      <Divider />
      <Grid container className={classes.chatInput}>
        <Grid item style={{ flexGrow: 1 }}>
          <CommentForm initValues={initValues} onSubmit={handleSubmit} />
        </Grid>
        {/*<Grid item>*/}
        {/*  <Box ml={2}>*/}
        {/*    <Fab color="primary" aria-label="add" size="medium">*/}
        {/*      <SendIcon />*/}
        {/*    </Fab>*/}
        {/*  </Box>*/}
        {/*</Grid>*/}
      </Grid>
    </Grid>
  )
}

export default CommentList
