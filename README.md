
[![Build Status](https://travis-ci.org/karak/diff-match-patch-line-and-word.svg?branch=master)](https://travis-ci.org/karak/diff-match-patch-line-and-word)

Diff Patch Merge Line and Unicode-Aware Word
====

What's this
----
An extension module that adds line-mode and word-mode diffs on 
<tt>[google-diff-match-patch](https://github.com/google/diff-match-patch)</tt> 
hosted as <tt>diff-patch-merge</tt> at NPM, originally by Neil Fraser, while respecting 
Unicode character sets and some general liquistic behaviors (e.g., hyphens and
apostrophes are parts of words, but underscores are not) when identifying word breaks.
This is based on karak's <tt>[diff-match-patch-line-and-word](https://github.com/karak/diff-match-patch-line-and-word</tt>

Support for languages using marks (vowel marks above/below/inside consonants), left-to-right
scripts, accented letters and similar items have been tested.  **PLEASE NOTE:** _Lines containing
mixed scripts may give unexpected results and are considered unsupported._ If you identify issues,
please give complete examples indicating the two inputs, the incorrect results, the expected results
and the name of the script used.

TypeScript is also supported.

API
----

### Methods

#### diff\_lineMode

Execute diff\_main __line-by-line__.

##### Parameter

|Parameter|Type  |Description|
|---------|------|-----------|
|text1    |string|Old text to compare.|
|text2    |string|New text to compare.|

##### Return value

|Type|Description|
|----|-----------|
|Array of diff\_patch\_merge.Diff|result diff tuples.|


#### diff\_wordMode

Execute diff\_main __word-by-word__.

The signature is same.

How to use
----

Just import after <tt>node-diff-patch-merge</tt>.

### Example:

```javascript
import { diff_match_patch } from 'diff-match-patch';
import 'diff-match-patch-line-and-unicode-aware-word'; // import globally to patch the class.

const dmp = new diff_match_patch();
const oldText = 'He writes the letter.';
const newText = 'She wrote the letters.';

const diffs = dmp.diff_lineMode(oldText, newText);
const html = dmp.diff_prettyHtml(diffs));

document.write(html);
```
