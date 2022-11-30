import { styled, Typography } from '@mui/material';
import type { Field } from '../../types';
import { FormTextField } from './FormTextField';

const Container = styled('div')({
  display: 'flex',
  gap: '1rem',
});

type Props = {
  children: any;
  title?: string;
};

export function Group({ children, title }: Props) {
  return (
    <div>
      {title && (
        <Typography variant="body1" fontWeight={600} sx={{ marginBottom: '0.5rem' }}>
          {title}
        </Typography>
      )}
      <Container>
        {children.map((field: Field) => (
          <FormTextField key={field.name} {...field} />
        ))}
      </Container>
    </div>
  );
}
