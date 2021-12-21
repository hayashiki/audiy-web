import { Divider, Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { FormikHelpers } from 'formik'
import React from 'react'

import FormikForm from '@/components/Form/FormikForm'
import FormikImageUpload, { FileInputField } from '@/components/Form/FormikImageUpload'
import FormikSubmitButton from '@/components/Form/FormikSubmitButton'
import FormikTextArea from '@/components/Form/FormikTextArea'
import { UploadAudioInput } from '@/generated/graphql'

type AudioFormProps = {
  initValues: UploadAudioInput | null
  onSubmit: (data: UploadAudioInput) => Promise<any>
}

const AudioForm = ({ initValues, onSubmit }: AudioFormProps) => {
  const handleSubmit = async (
    values: UploadAudioInput,
    { resetForm }: FormikHelpers<typeof values>,
  ) => {
    console.log('values', values)
    await onSubmit(values)
    resetForm()
  }

  return (
    <Grid>
      <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            New Audio
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            // className={classes.inputTitle}
          >
            Description
          </Typography>
          <FormikTextArea
            variant="outlined"
            name="description"
            label="Type your comment"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            // className={classes.inputTitle}
          >
            File
          </Typography>
          <FormikImageUpload
            name="file"
            label="image-uploader"
            description={`メインビジュアル\n画像など\n※10MBまで`}
          />
        </Grid>
        {/*<FileInputField name="file" />*/}
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <FormikSubmitButton fullWidth={false}>Submit</FormikSubmitButton>
        </Box>
      </FormikForm>
    </Grid>
  )
}

export default AudioForm
