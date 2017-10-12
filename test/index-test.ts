import { diff_match_patch, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from 'diff-match-patch';
import * as assert from 'power-assert';
import '../src/index';

describe('diff-match-match', () => {
  const diff = new diff_match_patch();

  describe('diff_wordMode', () => {
    it('compares sentence of 2 words.', () => {
      const spans = diff.diff_wordMode('I run.', 'I sit.');

      assert.deepStrictEqual(spans, [[
        DIFF_EQUAL,
        'I ',
      ], [
        DIFF_DELETE,
        'run',
      ], [
        DIFF_INSERT,
        'sit',
      ], [
        DIFF_EQUAL,
        '.',
      ]]);
    });

    it('compares word by word.', () => {
      const spans = diff.diff_wordMode('Then, I run. Oh!', 'There, I turn!');

      assert.deepStrictEqual(spans, [[
        DIFF_DELETE,
        'Then',
      ], [
        DIFF_INSERT,
        'There',
      ], [
        DIFF_EQUAL,
        ', I ',
      ], [
        DIFF_DELETE,
        'run. Oh',
      ], [
        DIFF_INSERT,
        'turn',
      ], [
        DIFF_EQUAL,
        '!',
      ]]);
    });
  });

  describe('diff_lineMode', () => {
    it('outputs whole diff.', () => {
      const spans = diff.diff_lineMode('I run.', 'I sit.');
      assert.deepStrictEqual(spans, [[
        DIFF_DELETE,
        'I run.',
      ], [
        DIFF_INSERT,
        'I sit.',
      ]]);
    });

    it('output 1 equal line in 3 lines.', () => {
      const spans = diff.diff_lineMode('I run.\nI\'m tired.\nAnd I love you.', 'I sit.\nI\'m tired.\nAnd I don\'t love you.');
      assert.deepStrictEqual(spans, [[
        DIFF_DELETE,
        'I run.\n',
      ], [
        DIFF_INSERT,
        'I sit.\n',
      ], [
        DIFF_EQUAL,
        'I\'m tired.\n',
      ], [
        DIFF_DELETE,
        'And I love you.',
      ], [
        DIFF_INSERT,
        'And I don\'t love you.',
      ]]);
    });
  });
});
