<script setup>
import { getSpeakerLink } from '#imports';
import { siGithub, siTwitter } from 'simple-icons/icons';
import { randomColor } from '~/helpers';
import { MAX_SPEAKERS_TO_REVEAL } from '~/models';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  revealed: {
    type: Number,
    default: 0,
    required: false
  },
  technologies: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['reveal']);

const random = performance.now();
const isLoading = ref(false);
const speaker = ref(null);
const randomUserPick = ref(Math.floor(Math.random() * 9) + 1);

function getColor(value) {
  const hue = [0, 360];
  return randomColor(value, 1, hue);
}

async function loadSpeaker(id) {
  isLoading.value = true;
  const speakerFromServer = await getSpeakerLink(id);
  speaker.value = speakerFromServer;

  // Cache image
  await fetch(`https://unavatar.io/${speaker.value.twitter}`);

  isLoading.value = false;
}

function onClickOption(id) {
  if (speaker.value || props.revealed >= MAX_SPEAKERS_TO_REVEAL) {
    return;
  }

  emit('reveal');
  loadSpeaker(id);
}
</script>

<style scoped>
@import '~/styles/variables.css';
.option {
  align-items: center;
  background-color: value($color-basic, brightest);
  cursor: pointer;
  display: flex;
  margin: 1vw;
  min-height: 14rem;
  width: 80vw;
  padding: 0.35rem;
  transform: perspective(500px);
  transform-style: preserve-3d;
  transition: all value($time, normal);
  position: relative;
  overflow: hidden;
  padding: 1rem;

  &.is-loading {
    animation: loading 1s infinite linear;
  }

  @keyframes loading {
    0% {
      transform: rotateY(0deg);
    }

    100% {
      transform: rotateY(360deg);
    }
  }

  @media screen and (min-width: value($media, s)) {
    width: 45vw;
  }

  @media screen and (min-width: value($media, m)) {
    width: 28vw;
  }

  &__image {
    max-width: 35%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 1rem;
  }

  &__info {
    padding-left: 1rem;
    display: flex;
    height: 100%;
    padding-top: 10%;
    flex-direction: column;
  }

  &__name {
    font-weight: value($font-weight, semibold);
    font-size: value($font-size, l);
    margin-left: 0;
    margin-bottom: 0.5rem;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__tags {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-top: 0.5rem;
  }

  &__tag {
    display: inline-flex;
    font-weight: value($font-weight, semibold);
    margin-right: 1rem;
    font-size: value($font-size, xs);
    margin-bottom: 0.25rem;
    padding: 0.15rem 0.25rem;

    background: value($color-basic, bright);
    border-radius: 4rem;
    justify-content: center;

    @media screen and (min-width: value($media, xxl)) {
      padding: 0.15rem 0.25rem;
      padding: 0.25rem 0.5rem;

      font-size: value($font-size, s);
    }
  }

  &__actions {
    position: absolute;
    right: 1rem;
    bottom: 0.5rem;
  }

  &__action {
    margin-left: 0.5rem;
    transition: value($time, normal);

    &:hover {
      filter: brightness(1.1);
    }

    &:deep(svg) {
      width: 1.5rem;
    }

    &--twitter:deep(svg) {
      fill: #1da1f2;
    }

    &--github:deep(svg) {
      fill: #181717;
    }
  }
}
</style>

<template>
  <Tilt
    :class="`option ${isLoading ? 'is-loading' : ''}`"
    :key="id"
    :id="id"
    :disabled="speaker && speaker.value"
    :style="{ '--background': getColor(random).background, '--foreground': getColor(random).foreground }"
    @click="onClickOption(id)"
  >
    <img class="option__image" v-if="speaker && speaker.value" :src="`https://unavatar.io/${speaker.value.twitter}`" />
    <img class="option__image" v-else :src="`/images/users/user${randomUserPick}.png`" />
    <div class="option__info">
      <span class="option__name" v-if="isLoading"> loading... </span>
      <span class="option__name" v-else-if="speaker && speaker.value"> {{ speaker.value.twitter }}</span>
      <span class="option__name" v-else>
        <span v-if="revealed >= MAX_SPEAKERS_TO_REVEAL"
          >{{ $t('speaker.max') }}{{ $t(`speaker.adjectives[${randomUserPick}]`) }}</span
        >
        <span v-else>{{ $t('speaker.reveal') }}</span>
      </span>

      <ul class="option__tags">
        <li class="option__tag" v-for="name in categories" :key="name">{{ name }}</li>
        <li class="option__tag" v-for="name in technologies" :key="name">{{ name }}</li>
      </ul>

      <div class="option__actions" v-if="speaker && speaker.value">
        <a
          class="option__action option__action--twitter"
          :href="`https://twitter.com/${speaker.value.twitter}`"
          target="_blank"
          v-html="siTwitter.svg"
        ></a>
        <a
          class="option__action option__action--github"
          :href="`https://github.com/${speaker.value.github}`"
          target="_blank"
          v-html="siGithub.svg"
        ></a>
      </div>
    </div>
  </Tilt>
</template>
