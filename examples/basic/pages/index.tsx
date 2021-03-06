import type { GetStaticProps, NextPage } from 'next';

const Top: NextPage<{ count: number }> = ({ count }) => {
  return (
    <div>
      <p>count: {count}</p>
    </div>
  );
};

export default Top;

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('called original getStaticProps', context);

  return {
    props: {},
  };
};
