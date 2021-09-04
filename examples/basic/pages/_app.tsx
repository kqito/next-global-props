import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

function Root({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default Root;

export const globalGetStaticProps: GetStaticProps = async (context) => {
  console.log('called globalGetStaticProps', context);

  return {
    props: {
      count: 100,
    },
  };
};

export const globalGetStaticPaths: GetStaticPaths = async (context) => {
  console.log('called globalGetStaticPaths', context);

  return {
    paths: [],
    fallback: true,
  };
};

/* export const globalGetServerSideProps: GetServerSideProps = async (context) => { */
/*   console.log('called globalGetServerSideProps'); */
/*   return { */
/*     props: {}, */
/*   }; */
/* }; */
