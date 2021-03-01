module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:jsdoc/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'jsdoc',
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [ // change this accordingly
      'warn',
      'unix',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
      {
        'requireForBlockBody': true,
      },
    ],
    'require-jsdoc': 'off', // favor eslint-plugin-jsdoc
    'valid-jsdoc': 'off', // favor eslint-plugin-jsdoc
    'require-atomic-updates': 'off', // prevent async false alarm
    '@typescript-eslint/no-var-requires': 'off', // enforce ES6 import style
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off', // prevent camelCase false alarm
    'no-unused-vars': 'off', // prevent enum export false alarm
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
