import type { FormAtom as TFormAtom } from '@/types';
import { Checkbox } from './Checkbox';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

export function FormAtom({ component, props }: TFormAtom) {
  switch (component) {
    case 'text':
      return <TextField {...props} />;

    case 'select':
      return <SelectField {...props} />;

    case 'checkbox':
      return <Checkbox {...props} />;

    default:
      return null;
  }
}
