<script setup>
import { githubLogin } from '#imports';
import { marked } from 'marked';

const login = githubLogin;
const user = await useGithubUser();
const technologies = ref([]);

// const { t } = VueI18n.useI18n();

useMeta({
  // title: t('message.hello', { msg: '1' })
});

function onClickLogin() {
  login();
}

function getMarkdown(text = '') {
  return marked(text);
}

async function getTechnologies() {
  try {
    const response = await useFetch('/api/wizard/technologies-random?take=5', {
      headers: {
        [GITHUB_TOKEN]: useCookie(GITHUB_TOKEN).value
      }
    });
    technologies.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

await getTechnologies();
</script>

<style scoped>
@import '~/styles/variables.css';

$logo-size: 15rem;
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &__hero {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  &__logo {
    height: $logo-size;
    width: $logo-size;
    position: relative;
  }

  &__circle {
    $separation: 40%;
    $size: calc($logo-size * 0.52);

    height: $size;
    width: $size;
    border-radius: 50%;
    position: absolute;
    opacity: 0.75;
    transition: transform value($time, slow);

    &--1 {
      background-color: value($color-primary, normal);
      z-index: 1;

      &:hover {
        transform: translate(-10%, -10%);
      }
    }

    &--2 {
      background-color: value($color-primary, bright);
      margin-left: $separation;
      z-index: 2;

      &:hover {
        transform: translate(10%, -10%);
      }
    }

    &--3 {
      background-color: value($color-primary, darker);
      margin-top: $separation;
      z-index: 2;

      &:hover {
        transform: translate(-10%, 10%);
      }
    }

    &--4 {
      background-color: value($color-primary, brighter);
      margin-left: $separation;
      margin-top: $separation;
      z-index: 3;
      opacity: 0.8;

      &:hover {
        transform: translate(10%, 10%);
      }
    }
  }

  &__summary {
    font-size: value($font-size, l);
    max-width: 50rem;
    line-height: 1.65rem;
    text-align: justify;
    margin-bottom: 2rem;
  }

  &__actions {
    display: flex;
    justify-content: space-around;
    width: 30rem;
    padding-bottom: 2rem;
  }
}
</style>

<template>
  <div class="home">
    <div class="home__hero">
      <div class="home__logo">
        <div class="home__circle home__circle--1"></div>
        <div class="home__circle home__circle--2"></div>
        <div class="home__circle home__circle--3"></div>
        <div class="home__circle home__circle--4"></div>
      </div>

      <ClientOnly>
        <IndexTitle :text="$t('home.title')" :technologies="technologies.value" />

        <template #fallback>
          <IndexTitlePlaceholder :text="$t('home.title')" :name="$t('home.technology')" />
        </template>
      </ClientOnly>
    </div>

    <div class="home__summary">
      <div class="home__text" v-html="getMarkdown($t('home.summary.introduction'))" />
    </div>

    <div class="home__actions">
      <a
        href="https://github.com/CKGrafico/talentforyourevent/issues/new?assignees=&labels=Draft%2C+User&template=add-user-to-platform.md&title=Add+User+%7Bgithub_name%7D+to+the+platform"
        target="_blank"
        class="button button--primary-bright"
      >
        {{ $t('home.actions.speaker') }}
      </a>
      <button class="button button--primary" @click="onClickLogin">{{ $t('home.actions.event') }}</button>
    </div>
  </div>
</template>
