const WORD_BOUNDARY_PATTERN = /\W/;

function indexOfWordBoundary(target: string, startIndex: number): number {
  const n = target.length;
  for (let i = startIndex; i < n; i += 1) {
    if (WORD_BOUNDARY_PATTERN.test(target[i])) {
      return i;
    }
  }
  return -1;
}

export default function tokenize(text: string, callback: (word: string) => void): void {
  let wordStart = 0;
  let wordEnd = -1;
  while (wordEnd < text.length - 1) {
    wordEnd = indexOfWordBoundary(text, wordStart);
    if (wordEnd !== -1) {
      if (wordStart !== wordEnd) {
        const word = text.substring(wordStart, wordEnd);
        callback(word);
      }
      const punct = text[wordEnd];
      callback(punct);
      wordStart = wordEnd + 1;
    } else {
      const word = text.substring(wordStart, text.length);
      callback(word);
      wordEnd = text.length;
      break;
    }
  }
}
