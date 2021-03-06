import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'

import { Loading } from '@/components/Common/Loading'
import { useAuth } from '@/context/AuthContext'
import { useCreateUserMutation } from '@/generated/graphql'
import { UserMapper } from '@/lib/firebase/firebase'

// set component styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    width: '100% !important',
    margin: '0 !important',
    maxWidth: 250,
  },
  googleText: {
    fontSize: '14px !important',
    fontWeight: 'bold',
  },
}))

const SignUp: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [createUser] = useCreateUserMutation()

  const { isAuthenticated, signInWithGoogle } = useAuth()

  // if (isAuthenticated) {
  //   router.push('/')
  //   return <Loading />
  // }

  const signInProcess = async () => {
    await signInWithGoogle('/')
    await router.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GoogleLoginButton className={classes.button} onClick={signInProcess}>
              <span className={classes.googleText}>Sign up with Google</span>
            </GoogleLoginButton>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright ?? hayashiki'}
          {/*<Link color="inherit" href="#">*/}
          {/*  My Website*/}
          {/*</Link>{' '}*/} {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  )
}

export default SignUp
