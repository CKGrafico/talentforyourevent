import { defineNuxtConfig } from 'nuxt3';
const stylePostFunctions = require('./styles/functions/post-functions.js');
const stylePreFunctions = require('./styles/functions/pre-functions.js');

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    DATABASE_URL: process.env.DATABASE_URL
  },
  css: ['~/styles/app.css'],
  buildModules: ['@vueuse/nuxt', '@pinia/nuxt'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          'postcss-functions': { functions: stylePreFunctions },
          'postcss-at-rules-variables': { atRules: ['each', 'mixin', 'media'] },
          'postcss-simple-vars': {},
          'postcss-replace': { pattern: /##/g, data: { replaceAll: '$' } },
          'postcss-mixins': {},
          'postcss-functions-post': { functions: stylePostFunctions },
          'postcss-each': {},
          'postcss-calc': {},
          'postcss-hexrgba': {},
          'postcss-fontpath': {},
          'postcss-nested': {},
          autoprefixer: {},
          'postcss-discard-comments': {}
        }
      }
    }
  },
  vueuse: {
    ssrHandlers: true
  }
});
