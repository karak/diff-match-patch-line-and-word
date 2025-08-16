import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.mocha,
            }
        },
        rules: {
            "camelcase": "off",
            "new-cap": "off",
        },
        settings: {
            "import/resolver": {
                typescript: {}
            }
        }
    },
    {
        ignores: ["node_modules/", "*.d.ts", "dist/"]
    }
];