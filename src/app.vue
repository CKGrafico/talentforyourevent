<script setup>
import { githubLogin } from '#imports';
import '~/styles/app.css';

const login = githubLogin;
const user = await useGithubUser();

useMeta({
  title: 'In progress'
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600&display=swap');
</style>
>

<template>
  <AppContainer>
    {{ $t('message.hello', ['1']) }}
    <User v-if="user" :user="user" />
    <button v-else @click="login">Login with GitHub</button>
  </AppContainer>
</template>
