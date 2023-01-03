import type { TextFieldProps } from '@mui/material';

/**
 * Follow atomic design pattern for form component hierarchy
 *
 * Layout? -> Organism -> Molecule -> Atom
 * **/

export type FormTypes = 'organism' | 'molecule' | 'atom';

export type FormSchema = Array<FormOrganism | FormAtom>;

export type FormOrganism = {
  type: 'organism';
  title: string;
  children: Array<FormMolecule | FormAtom>;
};

export type FormMolecule = {
  type: 'molecule';
  children: FormAtom[];
  title?: string;
};

export type FormAtom = TextField | SelectField | Checkbox;

export type TextField = {
  type: 'atom';
  component: 'text';
  props: {
    label: string;
    name: string;
    helperText?: string;
  } & TextFieldProps;
};

export type SelectField = {
  type: 'atom';
  component: 'select';
  props: {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    helperText?: string;
  } & TextFieldProps;
};

export type Checkbox = {
  type: 'atom';
  component: 'checkbox';
  props: {
    name: string;
    label: string;
  };
};
