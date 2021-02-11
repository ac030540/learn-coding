module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': [0],
    'react/react-in-jsx-scope': [0],
    'react/prop-types': [0],
    'react/forbid-prop-types': [2, { forbid: [] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-did-update-set-state': 'off',
    'react/require-default-props': [0, { forbidDefaultForRequired: false }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    document: false,
  },
};
