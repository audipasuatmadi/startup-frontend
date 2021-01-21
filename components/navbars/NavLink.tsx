import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  children: JSX.Element;
  activeClassName: string;
  exact?: boolean
}

const NavLink = ({ href, children, activeClassName, exact }: Props) => {
  const router = useRouter();

  const routePath = exact? router.pathname : router.pathname.split('/')[1]
  const className =
    routePath === href.split('/')[1]
      ? `${children.props.className} ${activeClassName}`
      : `${children.props.className}`;

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export default NavLink;
