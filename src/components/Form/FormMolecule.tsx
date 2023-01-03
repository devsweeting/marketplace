import { styled, Typography } from '@mui/material';
import type { FormMolecule as TFormMolecule } from '@/types';
import { FormAtom } from './FormAtom';

const AtomContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
});

export function FormMolecule({ children, title = '' }: TFormMolecule) {
  return (
    <div>
      <Typography variant="body1" fontWeight={600} sx={{ marginBottom: '0.5rem' }}>
        {title}
      </Typography>
      <AtomContainer>
        {children.map((atom, i) => (
          <FormAtom key={`molecule-atom-${i}`} {...atom} />
        ))}
      </AtomContainer>
    </div>
  );
}
