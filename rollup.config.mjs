// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'out',
    format: 'cjs'
  },
  plugins: [typescript()],
  external: ["iconv-lite"]
};