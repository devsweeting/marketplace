import { Divider, Typography, Link, Box } from '@mui/material';
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
  ButtonStyles,
} from './Footer.styles';
import { Button } from '@/components/Button';

export const Footer = () => {
  return (
    <Container>
      <TopContainer></TopContainer>
      <Divider />
      <BottomContainer>
        <Box className="box">
          <SocialLinks className="item">
            <Typography variant="sm">© 2023 Jump. All rights reserved.</Typography>
            <Box className="icons">
              <Link target="_blank" rel="noopener" href="https://twitter.com/0xJump">
                <TwitterIcon color="secondary" />
              </Link>
              <Link target="_blank" rel="noopener" href="https://www.linkedin.com/company/0xjump">
                <LinkedInIcon color="secondary" />
              </Link>
            </Box>
          </SocialLinks>
        </Box>
        <Box className="box">
          <Img
            className="item"
            src="/images/logoJump.svg"
            alt="Footer Logo"
            style={{ filter: 'brightness(0) invert(1)', height: '24px' }}
          />
        </Box>
        <Box className="box">
          <PageLinks className="item">
            <FooterNavLink href="/faq">
              <Button variant="text" color="secondary" style={ButtonStyles}>
                Refunds & Returns
              </Button>
            </FooterNavLink>
            <FooterNavLink href="https://www.jump.co/privacy">
              <Button variant="text" color="secondary" style={ButtonStyles}>
                Privacy Policy
              </Button>
            </FooterNavLink>
            <FooterNavLink href="https://www.jump.co/terms-of-service">
              <Button variant="text" color="secondary" style={ButtonStyles}>
                Terms of Service
              </Button>
            </FooterNavLink>
          </PageLinks>
        </Box>
      </BottomContainer>
    </Container>
  );
};
