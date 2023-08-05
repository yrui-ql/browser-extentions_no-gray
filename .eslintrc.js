module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    "no-param-reassign": [0, { props: false }],
  },
};
