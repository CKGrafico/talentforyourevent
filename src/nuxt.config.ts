import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    DATABASE_URL: process.env.DATABASE_URL
  },
  buildModules: ['@vueuse/nuxt', '@pinia/nuxt'],
  vueuse: {
    ssrHandlers: true
  }
});
