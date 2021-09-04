import { Checkbox, CheckboxProps } from '@material-ui/core'
import CheckedIcon from '@material-ui/icons/CheckTwoTone'
import { useField, FieldConfig } from 'formik'
import React, { FC } from 'react'

type Props = FieldConfig & CheckboxProps

const FormikCheckbox: FC<Props> = ({ name, value, ...props }) => {
  const [field] = useField({
    type: 'checkbox',
    name,
    value,
  })

  return <Checkbox color="primary" checkedIcon={<CheckedIcon />} {...field} {...props} />
}

export default FormikCheckbox
