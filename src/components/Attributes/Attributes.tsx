import type { IAttribute } from '@/types';
import { Container, Attribute } from './Attributes.styles';

interface AttributesProps {
  attributes: IAttribute[];
}

export function Attributes({ attributes }: AttributesProps) {
  if (!attributes) {
    return null;
  }
  return (
    <Container>
      {attributes.flatMap((attribute: IAttribute) => (
        <Attribute variant="body2" key={`${attribute.trait}-${attribute.value}`}>
          {attribute.value}
        </Attribute>
      ))}
    </Container>
  );
}
