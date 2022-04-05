<script setup>
import { githubLogin } from '#imports';

const login = githubLogin;
const user = await useGithubUser();

function checkIfUserIsLogged() {
  if (!user) {
    navigateTo('/');
  }
}

checkIfUserIsLogged();
</script>

<template>
  <div>Wizzard</div>
</template>
