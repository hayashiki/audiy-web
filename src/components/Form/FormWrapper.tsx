import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import React, { FC } from 'react'

const FormWrapper: FC = ({ children }) => {
  return (
    <Box mt={10} mb={2}>
      <Grid container justify="center">
        <Grid item xs={9} sm={5} md={3}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default FormWrapper
