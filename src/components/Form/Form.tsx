import { Formik, Form as FormikForm } from 'formik';
import type { FormikHelpers, FormikValues } from 'formik';
import { styled, Typography } from '@mui/material';
import { SubmitButton } from './SubmitButton';
import { FormError } from './FormError';
import { FormOrganism } from './FormOrganism';
import type { FormAtom as TFormAtom, FormOrganism as TFormOrganism, FormSchema } from '@/types';
import { FormAtom } from './FormAtom';

export const StyledForm = styled(FormikForm)(({ theme }) => ({
  padding: '2rem',
  maxWidth: 900,
  width: '100%',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '4rem',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    marginBottom: '2rem',
  },
}));

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
});

type Props<I, S> = {
  initialValues: I;
  schema: S;
  fields: FormSchema;
  submit: (values: I, helpers: FormikHelpers<I>) => Promise<void>;
  title: string;
};

const renderChild = (child: TFormOrganism | TFormAtom, index: number) => {
  switch (child.type) {
    case 'organism':
      return <FormOrganism key={`organism-${index}`} {...child} />;

    case 'atom':
      return <FormAtom key={`atom-${index}`} {...child} />;
  }
};

export function Form<I extends FormikValues, S>(props: Props<I, S>) {
  const { initialValues, schema, fields, submit, title } = props;

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      <StyledForm>
        <Title variant="xl6">{title}</Title>
        <Container>{fields.map((child, i) => renderChild(child, i))}</Container>
        <FormError />
        <SubmitButton />
      </StyledForm>
    </Formik>
  );
}
