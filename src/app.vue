<script setup>
import { githubLogin } from '#imports';

const login = githubLogin;
const user = await useGithubUser();

useMeta({
  title: 'In progress'
});
</script>

<template>
  <AppContainer>
    <h1 class="text-4xl flex items-center gap-2">
      Discuss with Atinux <i class="inline-flex i-carbon-chat text-black" />
    </h1>
    <User v-if="user" :user="user" />
    <button v-else @click="login" class="border rounded px-2 py-1">Login with GitHub</button>
  </AppContainer>
</template>
