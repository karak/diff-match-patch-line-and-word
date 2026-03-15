import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname
});

export default tseslint.config(
    {
        ignores: ["node_modules/", "*.d.ts", "dist/"],
    },
    ...compat.extends("airbnb-base"),
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.eslint.json",
                tsconfigRootDir: __dirname,
            },
            globals: {
                ...globals.es2021
            }
        },
        rules: {
            "import/no-unresolved": "off",
            "import/extensions": "off",
            "no-param-reassign": "off",
            "no-plusplus": "off",
            "camelcase": "off",
            "new-cap": "off",
            "object-curly-newline": "off",
            "no-underscore-dangle": "off",
            "no-prototype-builtins": "off",
            "no-unused-vars": "off",
            "no-undef": "off",
            "func-names": "off",
            "operator-linebreak": "off",
            "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0 }],
            "no-use-before-define": "off",
            "comma-spacing": "off",
            "function-paren-newline": "off",
            "arrow-parens": "off",
        }
    },
    {
        files: ["test/**/*.ts"],
        languageOptions: {
            globals: {
                ...globals.mocha
            }
        }
    }
);
