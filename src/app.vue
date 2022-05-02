<script setup>
import { githubLogin } from '#imports';
import '~/styles/app.css';

const login = githubLogin;
const user = await useGithubUser();
// const { t } = VueI18n.useI18n();

useMeta({
  // title: t('message.hello', { msg: '1' })
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' }]
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;500;700&display=swap&family=Noto+Sans:wght@100;300;400;600&display=swap');
</style>

<template>
  <main>
    <Header />
    <NuxtPage />
  </main>
</template>
