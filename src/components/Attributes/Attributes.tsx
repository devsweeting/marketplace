import type { IAttribute } from '@/types/assetTypes';
import { Container, Attribute } from './Attributes.styles';

interface AttributesProps {
  attributes: IAttribute[];
}

export function Attributes({ attributes }: AttributesProps) {
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
