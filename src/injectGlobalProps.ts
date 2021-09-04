import template from '@babel/template';
import type { NodePath, types } from '@babel/core';
import {
  NextProps,
  nextPropsValues,
  getNextGlobalProps,
  NEXT_PROPS,
} from './nextProps';
import { isAppPath, isDynamicPath, isPagePath } from './utils/path';
import {
  arrowFunctionExpression,
  blockStatement,
  callExpression,
  exportNamedDeclaration,
  identifier,
  isArrowFunctionExpression,
  isExportNamedDeclaration,
  isFunctionExpression,
  isIdentifier,
  isVariableDeclaration,
  variableDeclaration,
  variableDeclarator,
} from '@babel/types';

const context = 'context' as const;

export const injectGlobalProps = (
  path: NodePath<types.Program>,
  filename: string | null | undefined
) => {
  if (!filename || isAppPath(filename) || !isPagePath(filename)) {
    return;
  }

  console.log('filename', filename);

  const props: NextProps = {
    getStaticProps: undefined,
    getStaticPaths: undefined,
    getServerSideProps: undefined,
  };

  path.node.body.forEach((statement) => {
    if (!isExportNamedDeclaration(statement)) {
      return;
    }

    const { declaration } = statement;

    if (!isVariableDeclaration(declaration)) {
      return;
    }

    const path = declaration.declarations[0] || undefined;

    if (
      !isIdentifier(path.id) ||
      !nextPropsValues.includes(path.id.name) ||
      (!isFunctionExpression(path.init) &&
        !isArrowFunctionExpression(path.init))
    ) {
      return;
    }

    const key = path.id.name as keyof NextProps;
    const targetNextGlobalProps = getNextGlobalProps()[key];

    props[key] = path.init;

    if (!targetNextGlobalProps) {
      return;
    }

    console.log('update: ', filename, '=>', key);

    const innerStatement = template(
      `const [globalPropsResult, originalResult] = await Promise.all([%%globalProps%%(${context}), %%originalProps%%(${context})])

      return {
        ...globalPropsResult,
        ...originalResult
      }
      `
    )({
      globalProps: targetNextGlobalProps,
      originalProps: path.init,
    });

    console.log(statement);

    statement.declaration = variableDeclaration('const', [
      variableDeclarator(
        identifier(path.id.name),
        arrowFunctionExpression(
          [identifier(context)],
          blockStatement(
            Array.isArray(innerStatement) ? innerStatement : [innerStatement]
          ),
          true
        )
      ),
    ]);
  });

  Object.entries(props).forEach(([key, value]) => {
    const nextGlobalProps = getNextGlobalProps()[key as keyof NextProps];
    if (value !== undefined || nextGlobalProps === undefined) {
      return;
    }

    // Skip the getStaticPaths if it is not a dynamic route.
    if (key === NEXT_PROPS.getStaticPaths && !isDynamicPath(filename)) {
      return;
    }

    console.log('push: ', filename, '=>', key);

    path.node.body.push(
      exportNamedDeclaration(
        variableDeclaration('const', [
          variableDeclarator(
            identifier(key),
            arrowFunctionExpression(
              [identifier(context)],
              nextGlobalProps.body,
              true
            )
          ),
        ])
      )
    );
  });
};
