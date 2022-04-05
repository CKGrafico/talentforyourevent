<script setup>
const user = await useGithubUser();

checkIfUserIsLogged(user);
</script>

<template>
  <div>Wizzard</div>
</template>
