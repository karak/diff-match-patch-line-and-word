import * as assert from 'power-assert';
import tokenize from '../src/tokenize';

describe('tokenize', () => {
  it('tokenizes by spaces and tabs.', () => {
    assertTokenize('abc def\tghi', ['abc', ' ', 'def', '\t', 'ghi']);
  });

  it('tokenizes by punctuations.', () => {
    assertTokenize(
      'aA,b.c!d?e;f:g"j\'h',
      ['aA', ',' , 'b', '.', 'c', '!', 'd', '?', 'e', ';', 'f', ':', 'g', '"', 'j', '\'', 'h']);
  });

  it('separates adjacent punctuations.', () => {
    assertTokenize('"a."', ['"', 'a', '.', '"']);
  });

  it('separates adjacent space and punctuation.', () => {
    assertTokenize('oh, my god!', ['oh', ',', ' ', 'my', ' ', 'god', '!']);
  });

  it('can tokenize "ends-with-space."', () => {
    assertTokenize('Good. ', ['Good', '.', ' ']);
  });

  it('can tokenize "letter-after-period"', () => {
    assertTokenize(
      'I need to buy an apples.a',
      ['I', ' ', 'need', ' ', 'to', ' ', 'buy', ' ', 'an', ' ', 'apples', '.', 'a']);
  });
});

function assertTokenize(text: string, expected: string[]) {
  const tokens: string[] = [];
  tokenize(text, token => tokens.push(token));
  assert.deepStrictEqual(expected, tokens);
}
