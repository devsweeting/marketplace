import type { Checkbox as TCheckbox } from '@/types';
import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup } from '@mui/material';
import { useField } from 'formik';

type Props = TCheckbox['props'];

export function Checkbox({ name, label }: Props) {
  const [field, meta] = useField({ name, type: 'checkbox' });

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ color: meta.error ? 'red' : 'black' }}
        control={<MuiCheckbox {...field} inputProps={{ 'aria-label': 'controlled' }} />}
        label={label}
      />
    </FormGroup>
  );
}
