import type { AppProps } from 'next/app';
import { ProviderAuth } from '@hooks/useAuth';
import MainLayout from '@Layout/MainLayout/MainLayout';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderAuth>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ProviderAuth>
  );
}

export default MyApp;
