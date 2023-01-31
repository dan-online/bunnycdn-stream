import { resolve } from 'path';
import cleaner from 'rollup-plugin-cleaner';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: './dist/index.mjs',
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
    {
      file: './dist/index.umd.js',
      format: 'umd',
      name: 'BunnyCdnStream',
      sourcemap: true,
      globals: {
        axios: 'axios',
        'file-type': 'fileType',
        'node:crypto': 'crypto',
        fs: 'fs'
      }
    }
  ],
  external: ['axios', 'file-type', 'node:crypto', 'fs'],
  plugins: [nodePolyfills(), cleaner({ targets: ['./dist'] }), typescript({ tsconfig: resolve(process.cwd(), 'src', 'tsconfig.json') })]
};
