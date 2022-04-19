import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useNavLinkStyles } from './NavLink.styles';
// import classNames from 'classnames';
import { styled } from '@mui/system';
import { lighten } from '@mui/material';

const StyledLink = styled('a')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  cursor: 'pointer',
  color: theme.palette.secondary.main,
  '&:hover': {
    color: lighten(theme.palette.primary.main, 0.3),
  },
}));

export interface NavLinksProps {
  className?: any;
  href: any;
  children: any;
}
export const NavLink: React.FC<NavLinksProps> = ({ href, children }) => {
  // const classes = useNavLinkStyles();
  // const router = useRouter();

  return (
    <Link href={href}>
      {/* <a className={classNames(href === router.pathname && classes.navLinkActive, classes.navLink)}> */}
      <StyledLink>{children}</StyledLink>
    </Link>
  );
};
