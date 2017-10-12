"use strict";
/**
 * @file
 * LineDiff and WordDiff extension from
 * {@link
    https://github.com/GerHobbelt/google-diff-match-patch/blob/master/doc/wiki/LineOrWordDiffs.md}
 */
Object.defineProperty(exports, "__esModule", { value: true });
var diff_match_patch_1 = require("diff-match-patch");
var tokenize_1 = require("./tokenize");
diff_match_patch_1.diff_match_patch.prototype.diff_lineMode = function (text1, text2) {
    var _a = this.diff_linesToChars_(text1, text2), chars1 = _a.chars1, chars2 = _a.chars2, lineArray = _a.lineArray;
    var diffs = this.diff_main(chars1, chars2, false);
    this.diff_charsToLines_(diffs, lineArray);
    return diffs;
};
diff_match_patch_1.diff_match_patch.prototype.diff_wordMode = function (text1, text2) {
    var _a = this.diff_wordsToChars_(text1, text2), chars1 = _a.chars1, chars2 = _a.chars2, lineArray = _a.lineArray;
    var diffs = this.diff_main(chars1, chars2, false);
    this.diff_charsToLines_(diffs, lineArray);
    return diffs;
};
/** Copy and edit of {@link diff_linesToChars_} */
diff_match_patch_1.diff_match_patch.prototype.diff_wordsToChars_ = function (text1, text2) {
    var wordArray = [];
    var wordHash = {};
    wordArray[0] = '';
    // tslint:disable-next-line:variable-name
    var diff_linesToWordsMunge_ = function (text) {
        var chars = '';
        var wordArrayLength = wordArray.length;
        tokenize_1.default(text, function (word) {
            if (wordHash.hasOwnProperty ? wordHash.hasOwnProperty(word) :
                (wordHash[word] !== undefined)) {
                chars += String.fromCharCode(wordHash[word]);
            }
            else {
                chars += String.fromCharCode(wordArrayLength);
                wordHash[word] = wordArrayLength;
                // tslint:disable-next-line:no-increment-decrement
                wordArray[wordArrayLength++] = word;
            }
        });
        return chars;
    };
    var chars1 = diff_linesToWordsMunge_(text1);
    var chars2 = diff_linesToWordsMunge_(text2);
    return { chars1: chars1, chars2: chars2, lineArray: wordArray };
};
