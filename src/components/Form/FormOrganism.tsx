import { styled, Typography } from '@mui/material';
import { FormMolecule } from './FormMolecule';
import type {
  FormAtom as TFormAtom,
  FormMolecule as TFormMolecule,
  FormOrganism as TFormOrganism,
} from '@/types';
import { FormAtom } from './FormAtom';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const renderChild = (child: TFormMolecule | TFormAtom, index: number) => {
  switch (child.type) {
    case 'molecule':
      return <FormMolecule key={`organism-molecule-${index}`} {...child} />;

    case 'atom':
      return <FormAtom key={`organism-atom-${index}`} {...child} />;

    default:
      return;
  }
};

export function FormOrganism({ title, children }: TFormOrganism) {
  return (
    <Container>
      <Typography variant="xl3" fontWeight={700}>
        {title}
      </Typography>
      {children.map((child, i) => renderChild(child, i))}
    </Container>
  );
}
