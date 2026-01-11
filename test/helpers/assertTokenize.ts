import * as assert from 'power-assert';
import tokenize from '../../src/tokenize';

export default function assertTokenize(text: string, expected: string[]) {
  const tokens: string[] = [];
  tokenize(text, (token) => tokens.push(token));
  assert.deepStrictEqual(expected, tokens);
}
