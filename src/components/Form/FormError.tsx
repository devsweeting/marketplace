import { Typography } from '@mui/material';
import { useFormikContext } from 'formik';

export function FormError() {
  const { status } = useFormikContext();

  return <Typography color="error">{!!status && status.formError}</Typography>;
}
