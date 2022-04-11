<script setup>
import { githubLogout } from '#imports';

const logout = githubLogout;
const user = await useGithubUser();
</script>

<style scoped>
@import '~/styles/variables.css';

.header {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  &__image {
    border-radius: 50%;
    max-width: 2rem;
    object-fit: cover;
    width: 100%;
    margin-right: 0.25rem;
  }

  &__name {
    color: value($color-primary, brightest);
    cursor: pointer;
    font-size: value($font-size, s);
  }
}
</style>
<template>
  <div v-if="user" class="header">
    <img class="header__image" :src="user.avatar_url" />
    <span class="header__name" @click="logout" :title="$t('header.logout')"> {{ user.login }} </span>
  </div>
</template>
