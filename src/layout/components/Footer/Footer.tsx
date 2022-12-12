import { Divider, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Container,
  TopContainer,
  BottomContainer,
  Img,
  SocialLinks,
  PageLinks,
} from './Footer.styles';
import { Button } from '@/components/Button';
import Link from 'next/link';

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
          <FacebookIcon color="secondary" />
          <InstagramIcon color="secondary" />
          <TwitterIcon color="secondary" />
          <GitHubIcon color="secondary" />
        </SocialLinks>
      </TopContainer>
      <Divider />
      <BottomContainer>
        <Typography variant="body1">2022 JUMP. All rights reserved.</Typography>
        <PageLinks>
          <Link href="/site-policy/refunds-returns">
            <Button variant="text" color="secondary">
              Refunds & Returns
            </Button>
          </Link>
          <Link href="/site-policy/privacy-policy">
            <Button variant="text" color="secondary">
              Privacy Policy
            </Button>
          </Link>
          <Link href="/site-policy/terms-of-service">
            <Button variant="text" color="secondary">
              Terms of Service
            </Button>
          </Link>
        </PageLinks>
      </BottomContainer>
    </Container>
  );
};
