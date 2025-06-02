import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/**/*.js'],
  format: ['esm'],
  platform: 'node',
  target: 'node16',
  sourcemap: true,
  clean: true,
  watch: true,
  esbuildOptions(options) {
    options.alias = {
      '@': './src'
    };
    return options;
  }
});

