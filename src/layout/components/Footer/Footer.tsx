import { Divider, Typography, Link } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Container,
  TopContainer,
  BottomContainer,
  Img,
  SocialLinks,
  PageLinks,
  FooterNavLink,
} from './Footer.styles';
import { Button } from '@/components/Button';

export const Footer = () => {
  return (
    <Container>
      <TopContainer>
        <Img
          src="/images/logoJump.svg"
          alt="Footer Logo"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <SocialLinks>
          <Link target="_blank" rel="noopener" href="https://twitter.com/0xJump">
            <TwitterIcon color="secondary" />
          </Link>
          <Link target="_blank" rel="noopener" href="https://www.linkedin.com/company/0xjump">
            <LinkedInIcon color="secondary" />
          </Link>
        </SocialLinks>
      </TopContainer>
      <Divider />
      <BottomContainer>
        <Typography variant="body1">© 2023 Jump. All rights reserved.</Typography>
        <PageLinks>
          <FooterNavLink href="/faq">
            <Button variant="text" color="secondary">
              Refunds & Returns
            </Button>
          </FooterNavLink>
          <FooterNavLink href="https://www.jump.co/privacy">
            <Button variant="text" color="secondary">
              Privacy Policy
            </Button>
          </FooterNavLink>
          <FooterNavLink href="https://www.jump.co/terms-of-service">
            <Button variant="text" color="secondary">
              Terms of Service
            </Button>
          </FooterNavLink>
        </PageLinks>
      </BottomContainer>
    </Container>
  );
};
