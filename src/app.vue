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
    <h1 class="text-4xl flex items-center gap-2">
      Discuss with Atinux <i class="inline-flex i-carbon-chat text-black" />
    </h1>
    <User v-if="user" :user="user" />
    <button v-else @click="login" class="border rounded px-2 py-1">Login with GitHub</button>
  </AppContainer>
</template>
