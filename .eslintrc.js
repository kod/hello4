module.exports = {
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "parser": "babel-eslint",
    "rules": {
        "prettier/prettier": ["error", {
            "trailingComma": "all",
            "singleQuote": true
        }],
        "brace-style": [
            2
        ],
        "arrow-parens": [
            2,
            "as-needed"
        ],
        "no-param-reassign": 0,
        "no-constant-condition": ["error", { "checkLoops": false }],
        "no-bitwise": ["error", { "allow": ["~"] }],
        "arrow-body-style": ["error", "as-needed"],
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [".js"]
            }
        ],
        "react/jsx-wrap-multilines": 0,
        "react/prop-types": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-one-expression-per-line": 0,
        "import/no-unresolved": [
            2,
            {
                "ignore": ["^@/", "^umi/"]
            }
        ],
        "import/no-extraneous-dependencies": [
            2,
            {
                "optionalDependencies": true
            }
        ],
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "linebreak-style": ["error", "unix"],
    },
    "settings": {
        "polyfills": ["fetch", "promises", "url"],
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true,
        "jest": true,
        "jasmine": true,
    },
    "ecmaFeatures": {
        "jsx": true,
    },
    "globals": {
        "APP_TYPE": true,
    },
    "plugins": [
        "react",
        "prettier",
        "markdown",
        "jest"
    ]
};
