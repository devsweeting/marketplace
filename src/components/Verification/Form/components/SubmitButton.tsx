import { useFormikContext } from 'formik';
import { Button } from '@/components/Button';

export function SubmitButton() {
  const { submitForm } = useFormikContext();

  return (
    <Button variant="contained" onClick={() => void submitForm()} fullWidth>
      Submit
    </Button>
  );
}
