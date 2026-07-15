# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript module that extends Google's `diff-match-patch` library with line-mode and word-mode diffing capabilities. It works by monkey-patching the `diff_match_patch` class prototype to add two new methods: `diff_lineMode()` and `diff_wordMode()`.

**Package name:** `diff-match-patch-line-and-word`
**Version:** 0.1.3
**License:** MIT

## Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript (outputs to dist/)
npm run build

# Run all tests using Mocha with TypeScript support
npm test

# Run ESLint on TypeScript files
npm run lint

# Prepublish hook (runs build automatically)
npm run prepublish
```

## Project Structure

```
diff-match-patch-line-and-word/
├── src/
│   ├── index.ts          # Main module - extends diff_match_patch prototype
│   └── tokenize.ts       # Word tokenization utility
├── test/
│   ├── index-test.ts     # Tests for diff_lineMode and diff_wordMode
│   └── tokenize-test.ts  # Tests for word tokenization edge cases
├── dist/                 # Compiled JavaScript output (generated)
├── eslint.config.mjs     # ESLint flat config with airbnb-extended + TypeScript
├── tsconfig.json         # TypeScript configuration
└── package.json          # Package manifest
```

## Architecture

### Module Augmentation Pattern

The project uses TypeScript's module augmentation to extend the external `diff-match-patch` library without modifying it:

```typescript
declare module 'diff-match-patch' {
  interface diff_match_patch {
    diff_lineMode(text1: string, text2: string): Diff[];
    diff_wordMode(text1: string, text2: string): Diff[];
    diff_wordsToChars_(text1: string, text2: string): { chars1: string, chars2: string, lineArray: string[] };
  }
}
```

Methods are added to `diff_match_patch.prototype` at import time.

### Core Components

**src/index.ts** - Main entry point that:
- Declares TypeScript module augmentation for `diff-match-patch`
- Adds `diff_lineMode()` - performs line-by-line diffing using existing `diff_linesToChars_()`
- Adds `diff_wordMode()` - performs word-by-word diffing using custom `diff_wordsToChars_()`
- Implements `diff_wordsToChars_()` - converts words to character codes for efficient diffing

**src/tokenize.ts** - Word tokenization utility that:
- Splits text into words and punctuation using `/\W/` regex pattern
- Handles edge cases: adjacent punctuation, trailing spaces, text after periods
- Uses a callback-based API: `tokenize(text, (word) => { ... })`

### Algorithm Flow

Both line and word modes follow the same pattern:
1. Convert text to character codes using `diff_linesToChars_()` or `diff_wordsToChars_()`
2. Run standard `diff_main()` on the character-encoded strings (fast comparison)
3. Convert results back to original text using `diff_charsToLines_()`

## Configuration Details

### TypeScript (tsconfig.json)
- **Target:** ES5 with CommonJS modules
- **Strict checking:** `noImplicitReturns`, `noImplicitThis`, `noImplicitAny`, `strictNullChecks`
- **Output:** `dist/` for JS, root for `.d.ts` declarations
- **Explicit file list:** Only `src/index.ts` and `src/tokenize.ts` are compiled

### ESLint (eslint.config.mjs)
- Uses ESLint 9 flat config format (native, no `@eslint/eslintrc`/FlatCompat)
- Extends the Airbnb style guide via `eslint-config-airbnb-extended`, the flat-config successor to `eslint-config-airbnb-base`
- TypeScript-aware; type info comes from `tsconfig.eslint.json` (a lint-only project that also includes `test/`)
- Ignores: `node_modules/`, `*.d.ts`, `dist/`

### Testing
- **Framework:** Mocha with `espower-typescript` for TypeScript support
- **Assertions:** `power-assert` for enhanced assertion messages
- **Pattern:** Tests import `../src/index` to trigger prototype extensions

## CI/CD

GitHub Actions workflow (`.github/workflows/main.yml`):
- Triggers on push/PR to `master` branch
- Runs on `ubuntu-latest` with Node.js 18
- Steps: `npm ci` → `npm run build` → `npm run lint` → `npm test`

## Key Conventions

### Code Style
- Use TypeScript strict mode
- Follow Airbnb JavaScript style guide (via ESLint)
- Use `tslint:disable-next-line` comments for intentional rule violations (legacy)
- Variable naming: `camelCase` for variables, `snake_case` for diff-match-patch compatibility (e.g., `diff_wordMode`)

### Testing Conventions
- Test files named `*-test.ts` in `test/` directory
- Use `power-assert` with `deepStrictEqual` for array/object comparisons
- Import constants from `diff-match-patch`: `DIFF_DELETE`, `DIFF_EQUAL`, `DIFF_INSERT`
- Diff results are arrays of tuples: `[operation, text]`

### Dependencies
- **Peer dependency:** `diff-match-patch ^1.0.0` (must be installed by consuming project)
- **Dev only:** TypeScript, ESLint, Mocha, and related type definitions

## Common Tasks for AI Assistants

### Adding a New Diff Mode
1. Add method declaration to the `declare module` block in `src/index.ts`
2. Implement the method on `diff_match_patch.prototype`
3. Add tests in `test/index-test.ts`
4. Run `npm test` to verify

### Modifying Tokenization
1. Edit `src/tokenize.ts`
2. Add test cases in `test/tokenize-test.ts` for edge cases
3. Verify existing tests still pass

### Before Committing
1. Run `npm run build` - ensure TypeScript compiles without errors
2. Run `npm test` - ensure all tests pass
3. Run `npm run lint` - ensure code style compliance

## Troubleshooting

### Common Issues
- **"Cannot find module 'diff-match-patch'"**: Install the peer dependency: `npm install diff-match-patch`
- **Type errors after editing**: Run `npm run build` to regenerate `.d.ts` files
- **Tests not finding imports**: Ensure `espower-typescript/guess` is loaded via mocha config
