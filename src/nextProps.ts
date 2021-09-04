import { types } from '@babel/core';

export const NEXT_PROPS = {
  getStaticProps: 'getStaticProps',
  getStaticPaths: 'getStaticPaths',
  getServerSideProps: 'getServerSideProps',
} as const;
export const nextPropsValues: string[] = Object.values(NEXT_PROPS);

export type NextProps = {
  getStaticProps:
    | types.FunctionExpression
    | types.ArrowFunctionExpression
    | undefined;
  getStaticPaths:
    | types.FunctionExpression
    | types.ArrowFunctionExpression
    | undefined;
  getServerSideProps:
    | types.FunctionExpression
    | types.ArrowFunctionExpression
    | undefined;
};

const nextGlobalProps: NextProps = {
  getStaticProps: undefined,
  getStaticPaths: undefined,
  getServerSideProps: undefined,
};

export const getNextGlobalProps = () => nextGlobalProps;
export const setNextGlobalProps = <T extends keyof NextProps>(
  key: T,
  value: NextProps[T]
) => {
  nextGlobalProps[key] = value;
};
