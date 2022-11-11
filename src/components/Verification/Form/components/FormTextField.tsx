import { TextField } from '@/components/TextField';
import type { TextFieldProps } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useField } from 'formik';

type Props = {
  name: string;
  label: string;
  options?: { label: string; value: string }[];
} & TextFieldProps;

export function FormTextField(props: Props) {
  const { name, label, helperText, options } = props;
  const [field, meta] = useField(name);

  return (
    <TextField
      {...props}
      label={label}
      name={field.name}
      helperText={meta.touched ? meta.error : helperText}
      error={meta.touched && !!meta.error}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      fullWidth
    >
      {options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
