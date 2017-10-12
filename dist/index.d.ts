declare module 'diff-match-patch' {
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
            chars1: string;
            chars2: string;
            lineArray: string[];
        };
    }
}
export {};
