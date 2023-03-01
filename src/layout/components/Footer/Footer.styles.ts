import { styled } from '@mui/material';
import Link from 'next/link';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.main,
  padding: '2rem',
  gap: '2rem',
}));

export const TopContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  margin: '.5rem 0',
});

export const Img = styled('img')({});

export const SocialLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  '> .icons': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

// The 'Box' classNames makes keeps the Jump logo aligned on the center vertical axis
// while the left and right items are allowed space to grow on different screensizes.
export const BottomContainer = styled('div')({
  width: '100%',
  display: 'flex',
  '.box': {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.box:first-child > .item': { marginRight: 'auto' },

  '.box:last-child  > .item': { marginLeft: 'auto' },
});

export const PageLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: '.5rem 0rem',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-end',
  },
}));

export const FooterNavLink = styled(Link)({
  textDecoration: 'none',
  cursor: 'pointer',
});

export const ButtonStyles = {
  fontSize: '.875rem',
};
