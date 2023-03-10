import { FC } from 'react';
import { NavigationHeader, NavigationLink } from '@/components';

const Header: FC<Type.HeaderProps> = ({ navigationLinks = [] }) => (
  <NavigationHeader>
    {navigationLinks.map(({ title, link }) => (
      <NavigationLink key={title} title={title} link={link} />
    ))}
  </NavigationHeader>
);

export default Header;
