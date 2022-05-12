import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import { useNavLinkStyles } from './NavLink.styles';

export interface NavLinksProps {
  className?: any;
  href: any;
  children: any;
}
export const NavLink: React.FC<NavLinksProps> = ({ href, children }) => {
  const classes = useNavLinkStyles();
  const router = useRouter();

  return (
    <Link href={href}>
      <Typography
        variant="h4"
        component="span"
        className={classNames(href === router.asPath && classes.navLinkActive, classes.navLink)}
      >
        {children}
      </Typography>
    </Link>
  );
};
