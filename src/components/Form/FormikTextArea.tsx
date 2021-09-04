import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { useField, FieldConfig } from 'formik'
import React, { FC, memo } from 'react'

type Props = FieldConfig & TextFieldProps

const FormikTextArea: FC<Props> = ({ name, ...props }) => {
  const [field, { touched, error }] = useField({
    name,
  })

  const isError = Boolean(touched && error)

  return (
    <TextField
      {...props}
      {...field}
      error={isError}
      helperText={isError ? `- ${error}` : null}
      variant="outlined"
      margin="dense"
      fullWidth
      multiline
      rows={5}
    />
  )
}

export default memo(FormikTextArea)
