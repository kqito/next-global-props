import type { GetStaticProps, NextPage } from 'next';

const Count: NextPage<{ count: number }> = ({ count }) => {
  return (
    <div>
      <p>count: {count}</p>
    </div>
  );
};

export default Count;

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('called original getStaticProps', context);

  return {
    props: {
      count: 999999,
    },
  };
};
