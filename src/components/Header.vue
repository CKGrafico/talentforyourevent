<script setup>
import { githubLogout } from '#imports';

const logout = githubLogout;
const user = await useGithubUser();
</script>

<style scoped>
@import '~/styles/variables.css';

.header {
  width: 100%;
  display:flex;
  background-color: #45c4b0;
}

.home {

  &__image {
    max-width: 2rem;
    object-fit: cover;
    width: 100%;
    margin-right: 0.25rem;
    margin-left: 0.5rem;
    margin-top: 0.25rem;
  }

}

.user {
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  position: absolute;
  display: flex;
  right: 0;

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
<div class="header">
  <div class="home">
  <a href="/">
    <img class="home__image" src="/images/logo.svg" />
  </a>
  </div>
  <div v-if="user" class="user">
    <img class="user__image" :src="user.avatar_url" />
    <span class="user__name" @click="logout" :title="$t('header.logout')"> {{ user.login }} </span>
  </div>
</div>
</template>
