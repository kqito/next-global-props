import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Top: NextPage<{ count: number }> = ({ count }) => {
  return (
    <div className={styles.container}>
      <p>count: {count}</p>
    </div>
  );
};

export default Top;

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('called original getStaticProps', context);

  return {
    props: {
      count: 999999,
    },
  };
};
