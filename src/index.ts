import { types } from '@babel/core';
import { PluginPass, Visitor, PluginObj } from '@babel/core';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';

type Types = typeof types;

const visitor: Visitor<PluginPass> = {
  ExportDeclaration(path, state) {
    const { node } = path; // const node: t.ClassDeclaration

    console.log(state.file.opts.filename);
  },
};

function nextGlobalPropsPlugin(_api: Types): PluginObj {
  const pagesDir = findPagesDir(process.cwd());

  console.log('pagesdir', pagesDir);

  return {
    name: 'babel-example-plugin',
    visitor,
  };
}

export default nextGlobalPropsPlugin;
