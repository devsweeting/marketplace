import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavText } from './NavLink.styles';

export interface NavLinksProps {
  className?: any;
  href: any;
  children: any;
}
export const NavLink = ({ href, children }: NavLinksProps) => {
  const router = useRouter();

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <NavText variant="nav" active={href === router.asPath}>
        {children}
      </NavText>
    </Link>
  );
};
