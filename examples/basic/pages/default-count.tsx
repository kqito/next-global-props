import type { NextPage } from 'next';

const Count: NextPage<{ count: number }> = ({ count }) => {
  return (
    <div>
      <p>count: {count}</p>
    </div>
  );
};

export default Count;
