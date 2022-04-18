import fs from 'fs';
import { defineNuxtConfig } from 'nuxt3';

const stylePostFunctions = require('./styles/functions/post-functions.js');
const stylePreFunctions = require('./styles/functions/pre-functions.js');

// https://github.com/nuxt-community/i18n-module/issues/1416
const locales = fs.readdirSync('locales').map((file) => {
  return { code: file.replace('.json', ''), file: file };
});

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    DATABASE_URL: process.env.DATABASE_URL
  },
  buildModules: ['@vueuse/nuxt', '@pinia/nuxt'],
  modules: ['@nuxtjs/i18n'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          'postcss-functions': { functions: stylePreFunctions },
          'postcss-at-rules-variables': { atRules: ['each', 'mixin', 'media', 'for'] },
          'postcss-simple-vars': {},
          'postcss-replace': { pattern: /##/g, data: { replaceAll: '$' } },
          'postcss-mixins': {},
          'postcss-functions-post': { functions: stylePostFunctions },
          'postcss-each': {},
          'postcss-calc': {},
          'postcss-hexrgba': {},
          'postcss-color-mod-function': {},
          'postcss-fontpath': {},
          'postcss-nested': {},
          autoprefixer: {},
          'postcss-discard-comments': {}
        }
      }
    }
  },
  loading: {
    color: '#13678a',
    height: '5px'
  },
  vueuse: {
    ssrHandlers: true
  },
  i18n: {
    locales: locales,
    defaultLocale: 'es',
    langDir: 'locales',
    vueI18n: {
      locale: process.env.VUE_APP_I18N_LOCALE || 'es',
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'es'
    }
  }
});
