// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
//import prettier from 'eslint-plugin-prettier'

export default withNuxt(
  {
    files: ['**/*.{ts,js,vue}'],
    plugins: {
      prettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
/*      'prettier/prettier': ['error'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      'vue/html-indent': ['error', 2],*/
    },
  },
)
