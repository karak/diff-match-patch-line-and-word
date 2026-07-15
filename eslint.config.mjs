import path from 'path';
import { fileURLToPath } from 'url';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import globals from 'globals';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ['node_modules/', 'dist/', '**/*.d.ts'],
  },
  // Register the plugins (and TypeScript parser) that the Airbnb configs rely on.
  plugins.stylistic,
  plugins.importX,
  plugins.typescriptEslint,
  // Airbnb style guide, flat-config native, for JavaScript and TypeScript.
  ...configs.base.recommended,
  ...configs.base.typescript,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // This module interoperates with `diff-match-patch`, whose public
      // API uses snake_case members (e.g. `diff_match_patch`,
      // `diff_linesToChars_`). Naming rules would flag every reference,
      // so relax them for the sake of API compatibility.
      camelcase: 'off',
      'no-underscore-dangle': 'off',
      'new-cap': 'off',
      '@typescript-eslint/naming-convention': 'off',
      // This package compiles down to ES5 (see tsconfig `target`/`lib`), so
      // `Object.hasOwn` is not available at runtime.
      'prefer-object-has-own': 'off',
      // Keep explicit `.../index` specifiers: the compiled CommonJS output is
      // consumed by loaders that do not resolve bare directory imports.
      'import-x/no-useless-path-segments': ['error', { noUselessIndex: false }],
    },
  },
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
  {
    // `__dirname`/`__filename` are the conventional names when reconstructing
    // them in an ES module, so allow them in this config file.
    files: ['eslint.config.mjs'],
    rules: {
      'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
    },
  },
];
