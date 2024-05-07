import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  keepNames: true,
  treeshake: true
});
