<script setup>
import { githubLogout } from '#imports';

const logout = githubLogout;
const user = await useGithubUser();
</script>

<style scoped>
@import '~/styles/variables.css';

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: value($color-primary, normal);
  padding: 0 1rem;

  &__column {
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    display: flex;
  }

  &__logo,
  &__avatar {
    max-width: 2rem;
    object-fit: cover;
    width: 100%;
    margin: 0.25rem;
  }

  &__logo {
    filter: saturate(1);
    transition: filter value($time, slow);

    &:hover {
      filter: saturate(1.25) brightness(0.95);
    }
  }

  &__avatar {
    border-radius: 50%;
    border: 1px solid color: value($color-primary, brighter);
  }

  &__name {
    color: value($color-primary, brighter);
    cursor: pointer;
    font-size: value($font-size, s);
    transition: color value($time, normal);
    padding-left: 0.25rem;

    &:hover {
      color: value($color-primary, brightest);
    }
  }
}
</style>

<template>
  <div v-if="user" class="header">
    <div class="header__column">
      <a href="/">
        <img class="header__logo" src="/images/logo.svg" alt="Logo" />
      </a>
    </div>
    <div class="header__column">
      <img class="header__avatar" :src="user.avatar_url" />
      <span class="header__name" @click="logout" :title="$t('header.logout')"> {{ user.login }} </span>
    </div>
  </div>
</template>
