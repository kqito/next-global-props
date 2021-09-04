import type { types } from '@babel/core';
import {
  isIdentifier,
  isArrowFunctionExpression,
  isFunctionExpression,
  isVariableDeclaration,
} from '@babel/types';
import { setNextGlobalProps, NextProps } from './nextProps';
import { isAppPath } from './utils/path';

export const NEXT_GLOBAL_PROPS: Record<string, string> = {
  globalGetStaticProps: 'getStaticProps',
  globalGetStaticPaths: 'getStaticPaths',
  globalGetServerSideProps: 'getServerSideProps',
} as const;
export const nextGlobalPropsKeys: string[] = Object.keys(NEXT_GLOBAL_PROPS);

export const setGlobalPropsExpressionFromRoot = (
  declaration: types.Declaration | null | undefined,
  filename: string | null | undefined
) => {
  if (!isAppPath(filename)) {
    return;
  }

  if (!isVariableDeclaration(declaration)) {
    return;
  }

  const variableDeclarator = declaration.declarations[0] || undefined;

  if (
    !isIdentifier(variableDeclarator.id) ||
    !nextGlobalPropsKeys.includes(variableDeclarator.id.name) ||
    (!isFunctionExpression(variableDeclarator.init) &&
      !isArrowFunctionExpression(variableDeclarator.init))
  ) {
    return;
  }

  setNextGlobalProps(
    NEXT_GLOBAL_PROPS[variableDeclarator.id.name] as keyof NextProps,
    variableDeclarator.init
  );
};
