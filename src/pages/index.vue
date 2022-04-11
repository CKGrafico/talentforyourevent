<script setup>
import { githubLogin } from '#imports';

const login = githubLogin;
const user = await useGithubUser();
// const { t } = VueI18n.useI18n();

useMeta({
  // title: t('message.hello', { msg: '1' })
});

function onClickLogin() {
  login();
}
</script>

<style scoped>
@import '~/styles/variables.css';

.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &__hero {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  &__logo {
    width: 13rem;
    max-width: 100%;
  }

  &__title {
    font-weight: value($font-weight, bold);
  }

  &__summary {
    max-width: 60rem;
    font-size: value($font-size, l);
  }

  &__actions {
    display: flex;
    justify-content: space-around;
    width: 30rem;
  }
}
</style>

<template>
  <div class="home">
    <div class="home__hero">
      <img src="/images/logo.svg" :alt="$t('home.logo')" class="home__logo" />
      <h1 class="home__title">{{ $t('home.title') }}</h1>
    </div>

    <div class="home__summary">
      <p class="home__text">{{ $t('home.summary.introduction') }}</p>
      <p class="home__text">{{ $t('home.summary.ending') }}</p>
    </div>

    <div class="home__actions">
      <a href="https://github.com" target="_blank" class="button button--primary-bright">
        {{ $t('home.actions.speaker') }}
      </a>
      <button class="button button--primary" @click="onClickLogin">{{ $t('home.actions.event') }}</button>
    </div>
  </div>
</template>
