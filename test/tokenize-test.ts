import * as assert from 'power-assert';
import tokenize from '../src/tokenize';

describe('tokenize', () => {
  it('tokenizes by spaces and tabs.', () => {
    assertTokenize('abc def\tghi', ['abc', ' ', 'def', '\t', 'ghi']);
  });

  it('tokenizes by certain punctuation.', () => {
    assertTokenize(
      'aA,b.c!d?e;f:g"j\'hkl’m-n:t',
      ['aA', ',' , 'b', '.', 'c', '!', 'd', '?', 'e', ';', 'f', ':', 'g', '"', 'j\'hkl’m-n', ':', 't']);
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

  it('can tokenize "a hyphenated word"', () => {
    assertTokenize("I think neo-liberals are...", ['I', ' ', 'think', ' ', 'neo-liberals', ' ', 'are', '.', '.', '.']);
  });

  it('can tokenize "a complex French phrase"', () => {
    assertTokenize("Qu'est-ce que c'est?", ["Qu'est-ce", ' ', 'que', ' ', "c'est", '?']);
  });

  it('can tokenize and ignore accented characters in the middle of a word', () => {
    assertTokenize("mexilhões ", ['mexilhões', ' ']);
  });

  // Note: marks are vowel-like marks that combine with other eltters and are
  // used in some "eastern" languages. What looks like one symbol is actually two.
  it('can tokenize non-Latin scripts with marks', () => {
    assertTokenize('मेरा जूता हे जापानी', ['मेरा', ' ', 'जूता', ' ', 'हे', ' ', 'जापानी']);
  });

  // CAUTION: edit this next test gently if your editor doesn't handle 
  // right-to-left text mixed with left-to-right. In all likelihood your editor
  // makes it look like the arguments are in the wrong order. Trust me.
  it('can tokenize right-to-left scripts (with marks)', () => {
    assertTokenize('אֲנִי לֹא מֵבִין', ['אֲנִי', ' ', 'לֹא', ' ', 'מֵבִין']);
  });

});

function assertTokenize(text: string, expected: string[]) {
  const tokens: string[] = [];
  tokenize(text, token => tokens.push(token));
  assert.deepStrictEqual(expected, tokens);
}
