import { TextField as MuiTextField } from '@mui/material';
import { useField } from 'formik';
import type { TextField as TTextField } from '@/types';

type Props = TTextField['props'];

export function TextField(props: Props) {
  const { name, label, helperText } = props;
  const [field, meta] = useField(name);

  return (
    <MuiTextField
      {...props}
      {...field}
      label={label}
      helperText={meta.touched ? meta.error : helperText}
      error={meta.touched && !!meta.error}
      fullWidth
    />
  );
}
