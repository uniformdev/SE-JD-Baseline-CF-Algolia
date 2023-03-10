import React from 'react';
import { NextPage } from 'next';
import { UniformContext } from '@uniformdev/context-react';
import { UniformAppProps } from '@uniformdev/context-next';
import createUniformContext from '@/context/createUniformContext';
import { Header, NavigationFooter, TrackersProvider } from '@/components';
import '@/canvas';
import '@/styles/globals.scss';
import 'tailwindcss/tailwind.css';

const clientContext = createUniformContext();

export const App: NextPage<UniformAppProps<Type.HeaderProps>> = ({ Component, pageProps }) => (
  <UniformContext context={clientContext}>
    <Header navigationLinks={pageProps.navigationLinks} />
    <Component {...pageProps} />
    <NavigationFooter />
    <TrackersProvider />
  </UniformContext>
);

export default App;
