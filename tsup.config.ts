import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: false,
  target: 'chrome119',
  format: 'esm',
  minify: true,
  outExtension: () => ({
    js: '.js',
  }),
  publicDir: true,
})
