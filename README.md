Diff Patch Merge Line and Word
====

What's this
----

An extension module that adds line-mode and word-mode on <tt>[google-diff-match-patch](https://code.google.com/archive/p/google-diff-match-patch/)</tt>, 
hosted as <tt>diff-patch-merge</tt> at NPM, originally by Neil Fraser.

Implementation is from [Wiki](
https://code.google.com/archive/p/google-diff-match-patch/wikis/LineOrWordDiffs.wiki).

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
import 'diff-match-patch-line-and-word'; // import globally to  enhanse the class.

const dmp = new diff_match_patch();
const oldText = 'He writes the letter.';
const newText = 'She wrote the letters.';

const diffs = dmp.diff_lineMode(oldText, newText);
const html = dmp.diff_prettyHtml(diffs));

document.write(html);
```
