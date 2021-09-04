import { types } from '@babel/core';
import { PluginPass, Visitor, PluginObj } from '@babel/core';
import { injectGlobalProps } from './injectGlobalProps';
import { setGlobalPropsExpressionFromRoot } from './setGlobalPropsExpressionFromRoot';

type Types = typeof types;

const visitor: Visitor<PluginPass> = {
  ExportNamedDeclaration(path, state) {
    const { node } = path;
    const { declaration } = node;

    setGlobalPropsExpressionFromRoot(declaration, state.file.opts.filename);
  },
  Program(path, state) {
    injectGlobalProps(path, state.file.opts.filename);
  },
};

function nextGlobalPropsPlugin(/* _api: Types */): PluginObj {
  return {
    name: 'next-global-props-plugin',
    visitor,
  };
}

export default nextGlobalPropsPlugin;
