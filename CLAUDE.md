# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript module that extends Google's `diff-match-patch` library with line-mode and word-mode diffing capabilities. It works by monkey-patching the `diff_match_patch` class to add two new methods: `diff_lineMode()` and `diff_wordMode()`.

## Development Commands

### Building
```bash
npm run build          # Compile TypeScript to JavaScript (outputs to dist/)
```

### Testing
```bash
npm test              # Run all tests using Mocha with TypeScript support
```

### Linting
```bash
npm run lint          # Run ESLint on TypeScript files
```

### Publishing
```bash
npm run prepublish    # Runs build automatically before publishing
```

## Architecture

### Core Components

- **src/index.ts**: Main module that extends `diff_match_patch` via TypeScript module augmentation
  - Adds `diff_lineMode()` method that performs line-by-line diffing
  - Adds `diff_wordMode()` method that performs word-by-word diffing  
  - Implements `diff_wordsToChars_()` private method (word equivalent of existing `diff_linesToChars_()`)

- **src/tokenize.ts**: Word tokenization utility
  - Splits text into words and punctuation using regex pattern `/\W/`
  - Handles edge cases like adjacent punctuation and trailing spaces
  - Used by word-mode diffing to break text into comparable units

### Module Augmentation Pattern

The project uses TypeScript's module augmentation to extend the external `diff-match-patch` library:

```typescript
declare module 'diff-match-patch' {
  interface diff_match_patch {
    diff_lineMode(text1: string, text2: string): Diff[];
    diff_wordMode(text1: string, text2: string): Diff[];
  }
}
```

This allows adding methods to an existing class without modifying the original library.

### Algorithm Implementation

Both line and word modes follow the same pattern:
1. Convert text to character codes using existing `diff_linesToChars_()` or custom `diff_wordsToChars_()`
2. Run standard `diff_main()` on the character-encoded strings
3. Convert results back to original text using `diff_charsToLines_()`

## Configuration

- **TypeScript**: Targets ES5 with CommonJS modules, strict type checking enabled
- **ESLint**: Uses Airbnb base configuration with TypeScript parser
- **Test Framework**: Mocha with `espower-typescript` for assertion power-ups
- **Dependencies**: Peer dependency on `diff-match-patch ^1.0.0`

## Test Structure

Tests are organized by functionality:
- `test/index-test.ts`: Tests for `diff_lineMode()` and `diff_wordMode()` methods
- `test/tokenize-test.ts`: Tests for word tokenization edge cases

Test files use `power-assert` for enhanced assertion messages and import the main module to trigger the prototype extensions.