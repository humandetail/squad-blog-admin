module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: 0,
    'vue/multi-word-component-names': 0,
    // disabled until issue has been fixed: https://github.com/benmosher/eslint-plugin-import/issues/653
    'import/no-named-default': 0,
    'no-unused-vars': 0
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
