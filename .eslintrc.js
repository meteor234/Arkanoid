module.exports = {
  extends: ["airbnb-base"],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },

  overrides: [
    {
      files: ["*.[jt]s"],
      rules: {
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "import/no-cycle": 0,
        "class-methods-use-this": 1,
        semi: 0,
        quotes: 0,
        "no-underscore-dangle": 0,
        "prefer-arrow-callback": 0,
        "space-before-function-paren": 0,
        "func-names": 0,
        "no-param-reassign": 0,
        "no-plusplus": 0,
        "arrow-parens": 0,
        "object-curly-newline": 0,
      },
    },
  ],
}
