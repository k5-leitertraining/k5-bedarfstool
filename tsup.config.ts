import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: false,
  target: 'chrome119',
  format: 'esm',
  outExtension: () => ({
    js: '.js',
  }),
  publicDir: true,
})
