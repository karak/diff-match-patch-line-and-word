/**
 * @file
 * LineDiff and WordDiff extension from
 * {@link
    https://github.com/GerHobbelt/google-diff-match-patch/blob/master/doc/wiki/LineOrWordDiffs.md}
 */

import { diff_match_patch } from 'diff-match-patch';
import tokenize from './tokenize';

declare module 'diff-match-patch' {
  // tslint:disable-next-line:class-name no-shadowed-variable
  interface diff_match_patch {
    /**
     * Execute {@link diff_main} line by line.
     *
     * @see diff_main -- interface compatible without options.
     */
    diff_lineMode(text1: string, text2: string): Diff[];

    /**
     * Execute {@link diff_main} word by word.
     *
     * @see diff_main -- interface compatible without options.
     */
    diff_wordMode(text1: string, text2: string): Diff[];

    /**
     * Word version {@link diff_linesToChars_}.
     *
     * @see diff_linesToChars_
     * @private
     */
    diff_wordsToChars_(text1: string, text2: string): {
      chars1: string,
      chars2: string,
      lineArray: string[];
    };
  }
}

diff_match_patch.prototype.diff_lineMode = function (text1: string, text2: string) {
  const { chars1, chars2, lineArray } = this.diff_linesToChars_(text1, text2);
  const diffs = this.diff_main(chars1, chars2, false);
  this.diff_charsToLines_(diffs, lineArray);
  return diffs;
};

diff_match_patch.prototype.diff_wordMode = function (text1: string, text2: string) {
  const { chars1, chars2, lineArray } = this.diff_wordsToChars_(text1, text2);
  const diffs = this.diff_main(chars1, chars2, false);
  this.diff_charsToLines_(diffs, lineArray);
  return diffs;
};

/** Copy and edit of {@link diff_linesToChars_} */
diff_match_patch.prototype.diff_wordsToChars_ = function (text1: string, text2: string) {
  const wordArray: string[] = [];
  const wordHash: {[x: string]: number} = {};

  wordArray[0] = '';

  // tslint:disable-next-line:variable-name
  const diff_linesToWordsMunge_ = (text: string) => {
    let chars = '';
    let wordArrayLength = wordArray.length;
    tokenize(text, (word) => {
      if (wordHash.hasOwnProperty ? wordHash.hasOwnProperty(word)
        : (wordHash[word] !== undefined)) {
        chars += String.fromCharCode(wordHash[word]);
      } else {
        chars += String.fromCharCode(wordArrayLength);
        wordHash[word] = wordArrayLength;
        // tslint:disable-next-line:no-increment-decrement
        wordArray[wordArrayLength++] = word;
      }
    });
    return chars;
  };

  const chars1 = diff_linesToWordsMunge_(text1);
  const chars2 = diff_linesToWordsMunge_(text2);
  return { chars1, chars2, lineArray: wordArray };
};
