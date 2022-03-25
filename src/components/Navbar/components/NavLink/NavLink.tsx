import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNavLinkStyles } from './NavLink.styles';
import classNames from 'classnames';

interface NavLinksProps {
  className?: any;
  href: any;
  children: any;
}
export const NavLink: React.FC<NavLinksProps> = ({ href, children }) => {
  const classes = useNavLinkStyles();

  const router = useRouter();

  return (
    <Link href={href}>
      <a className={classNames(classes.navLink, href === router.pathname && classes.navLinkActive)}>
        {children}
      </a>
    </Link>
  );
};
