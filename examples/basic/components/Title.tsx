import { VFC } from 'react';

type TitleProps = Readonly<{
  title: string;
}>;

export const Title: VFC<TitleProps> = ({ title }) => {
  return <p>{title}</p>;
};
