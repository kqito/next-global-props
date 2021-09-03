import '../styles/globals.css';
import type { AppProps } from 'next/app';

function Root({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default Root;
