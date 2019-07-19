import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

function pgl(plugins=[]) {
  return plugins;
}

const srcEntry = pkg.source;

const umdDist = pkg['umd:main'];

export default [
  // browser-friendly UMD build
  {
    input: srcEntry,
    output: {
      name: 'didi',
      file: umdDist.replace(/\.js$/, '.prod.js'),
      format: 'umd'
    },
    plugins: pgl([
      terser()
    ])
  },
  {
    input: srcEntry,
    output: [
      {
        name: 'didi',
        file: umdDist,
        format: 'umd'
      },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: pgl()
  }
];