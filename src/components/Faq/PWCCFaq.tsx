import { Typography } from '@mui/material';
import { BuyingDrawer } from './FAQDrawer/BuyingDrawer';
import { Container, TextContainer, FaqContainer, TypedSection } from './Faq.styles';
import { SellersDrawer } from './FAQDrawer/SellingDrawer';
import { EyeAppealDrawer } from './FAQDrawer/EyeAppeal';
import { SecurityDrawer } from './FAQDrawer/SecurityDrawer';
import { VaultDrawer } from './FAQDrawer/VaultDrawer';
import { ShippingDrawer } from './FAQDrawer/ShippingDrawer';

export function PWCCFaq() {
  return (
    <Container>
      <TextContainer>
        <Typography variant="xl7" fontWeight={700} textAlign="center">
          Frequently asked questions
        </Typography>
      </TextContainer>
      <FaqContainer>
        <SellersDrawer />
        <BuyingDrawer />
        <EyeAppealDrawer />
        <SecurityDrawer />
        <VaultDrawer />
        <ShippingDrawer />
      </FaqContainer>
    </Container>
  );
}

export const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <TypedSection variant="lg" lineHeight="32px">
      {children}
    </TypedSection>
  );
};

export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="xl3" fontWeight={700}>
      {children}
    </Typography>
  );
};

export const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="lg" lineHeight="32px">
      {children}
    </Typography>
  );
};

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="xl" fontWeight={700}>
      {children}
    </Typography>
  );
};

export const LineBreak = () => <br></br>;
