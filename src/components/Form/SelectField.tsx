import { MenuItem, TextField as MuiTextField } from '@mui/material';
import { useField } from 'formik';
import type { SelectField as TSelectField } from '@/types';

type Props = TSelectField['props'];

export function SelectField(props: Props) {
  const { name, label, helperText, options } = props;
  const [field, meta] = useField(name);

  return (
    <MuiTextField
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
    </MuiTextField>
  );
}
