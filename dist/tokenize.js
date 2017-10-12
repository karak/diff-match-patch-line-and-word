"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WORD_BOUNDARY_PATTERN = /\W/;
function indexOfWordBoundary(target, startIndex) {
    var n = target.length;
    for (var i = startIndex; i < n; i += 1) {
        if (WORD_BOUNDARY_PATTERN.test(target[i])) {
            return i;
        }
    }
    return -1;
}
function tokenize(text, callback) {
    var wordStart = 0;
    var wordEnd = -1;
    while (wordEnd < text.length - 1) {
        wordEnd = indexOfWordBoundary(text, wordStart);
        if (wordEnd !== -1) {
            if (wordStart !== wordEnd) {
                var word = text.substring(wordStart, wordEnd);
                callback(word);
            }
            var punct = text[wordEnd];
            callback(punct);
            wordStart = wordEnd + 1;
        }
        else {
            var word = text.substring(wordStart, text.length);
            callback(word);
            wordEnd = text.length;
            break;
        }
    }
}
exports.default = tokenize;
