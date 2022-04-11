<script setup>
import { githubLogin } from '#imports';
import '~/styles/app.css';

const login = githubLogin;
const user = await useGithubUser();
// const { t } = VueI18n.useI18n();

useMeta({
  // title: t('message.hello', { msg: '1' })
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600&display=swap');
</style>

<template>
  <main>
    <Header />
    <NuxtPage />
  </main>
</template>
