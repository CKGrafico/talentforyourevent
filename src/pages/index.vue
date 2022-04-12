<script setup>
import { githubLogin } from '#imports';

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

try {
  const response = await useFetch('/api/wizard/technologies-random?take=5');
  technologies.value = response.data;
} catch (e) {
  console.error(e);
}
</script>

<style scoped>
@import '~/styles/variables.css';

$logo-size: 15rem;
$technology-size: 3rem;

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

  &__title {
    font-family: $font-title;
    font-weight: value($font-weight, bold);
    font-size: $technology-size;
    max-width: 30rem;
    text-align: center;
    margin-top: 0;
  }

  &__title-space {
    width: 10rem;
    display: inline-block;
  }

  &__technologies {
    position: absolute;
    height: $technology-size;
    width: 100%;
    overflow: hidden;
  }

  &__technology {
    position: absolute;
    height: $technology-size;
    left: 0;

    &--1 {
      margin-top: 0;
      animation: tech1 4s infinite;

      @keyframes tech1 {
        0% {
          transform: translateY(110%);
          opacity: 1;
        }

        30%,
        70% {
          transform: translateY(0);
          opacity: 1;
        }

        85% {
          opacity: 0;
        }

        97% {
          transform: translateY(-110%);
        }

        98% {
          transform: translate(-110%, -110%);
        }

        99% {
          transform: translate(-110%, 110%);
        }

        100% {
          transform: translate(0, 110%);
          opacity: 0;
        }
      }
    }
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
      <div class="home__logo">
        <div class="home__circle home__circle--1"></div>
        <div class="home__circle home__circle--2"></div>
        <div class="home__circle home__circle--3"></div>
        <div class="home__circle home__circle--4"></div>
      </div>
      <h1 class="home__title">
        {{ $t('home.title') }}
        <span class="home__technologies">
          <span
            v-for="({ id, name }, index) in technologies.value"
            :key="id"
            :class="`home__technology home__technology--${index + 1}`"
            >{{ name }}</span
          >
        </span>
        <span class="home__title-space"></span>
      </h1>
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
