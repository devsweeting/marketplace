import type { TextFieldProps } from '@mui/material';

export type SelectField = {
  type: 'select';
  label: string;
  name: string;
  options: { label: string; value: string }[];
  helperText?: string;
} & TextFieldProps;

export type TextField = {
  type: 'text';
  label: string;
  name: string;
  helperText?: string;
} & TextFieldProps;

export type Field = TextField | SelectField;

export type Group = {
  type: 'group';
  fields: Field[];
  title?: string;
};

export type SectionChildren = Array<Group | Field>;

export type Section = {
  type: 'section';
  title: string;
  children: SectionChildren;
};

export type FieldSchema = Section[];
