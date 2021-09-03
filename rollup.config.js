import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const external = [
  'fs',
  'path',
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript({
      tsconfigOverride: {
        compilerOptions: { module: 'es2015' },
      },
    }),
  ],
  external,
};
