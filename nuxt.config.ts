/// <reference types="nuxt" />
export default defineNuxtConfig({
  modules: ['@nuxt/test-utils/module', '@nuxt/eslint'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
    vite: {

    }
});
