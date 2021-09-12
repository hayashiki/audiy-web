import Box from '@material-ui/core/Box'
import { FormikHelpers } from 'formik'
import React from 'react'

import FormikForm from '@/components/Form/FormikForm'
import FormikSubmitButton from '@/components/Form/FormikSubmitButton'
import FormikTextArea from '@/components/Form/FormikTextArea'
import { CreateCommentInput } from '@/generated/graphql'

export type SubmitHandler<Values> = (values: Values, bag: FormikHelpers<Values>) => Promise<any>

type CommentFormProps = {
  initValues: CreateCommentInput
  onSubmit: (data: CreateCommentInput) => Promise<any>
}

const CommentForm = ({ initValues, onSubmit }: CommentFormProps) => {
  const handleSubmit = async (
    values: CreateCommentInput,
    { resetForm }: FormikHelpers<typeof values>,
  ) => {
    await onSubmit(values)
    resetForm()
  }

  return (
    <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
      <FormikTextArea variant="outlined" name="body" label="Type your comment" fullWidth />
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <FormikSubmitButton fullWidth={false}>Comment</FormikSubmitButton>
      </Box>
    </FormikForm>
  )
}

export default CommentForm
