import { styled, Typography } from '@mui/material';
import type { SectionChildren } from '../../types';
import { FormTextField } from './FormTextField';
import { Group } from './Group';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

type Props = {
  title: string;
  children: SectionChildren;
};

export function Section({ title, children }: Props) {
  return (
    <Container>
      <Typography variant="xl3" fontWeight={700}>
        {title}
      </Typography>
      {children.map((child, index) => {
        if (child.type === 'group') {
          return (
            <Group key={`group-${index}`} title={child.title}>
              {child.fields}
            </Group>
          );
        } else {
          return <FormTextField key={child.name} {...child} />;
        }
      })}
    </Container>
  );
}
