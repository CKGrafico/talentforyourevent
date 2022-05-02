<script setup>
import { getSpeakerLink } from '#imports';
import { randomColor } from '~/helpers';

const props = defineProps({
  id: {
    type: Number,
    required: true
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
  window.open(`https://twitter.com/${speakerFromServer.value.twitter}`, '_blank');
  isLoading.value = false;
}

function onClickOption(id) {
  loadSpeaker(id);
}
</script>

<style scoped>
@import '~/styles/variables.css';
.option {
  align-items: center;
  background-color: value($color-basic, brightest);
  box-shadow: 0 0 0px 2px transparent;
  cursor: pointer;
  display: flex;
  margin: 1vw;
  min-height: 14rem;
  width: 80vw;
  padding: 0.35rem;
  transform: perspective(500px);
  transform-style: preserve-3d;
  transition: box-shadow calc(value($time, slow) / 2) value($time, normal);
  position: relative;
  overflow: hidden;
  padding: 1rem;

  @media screen and (min-width: value($media, s)) {
    width: 45vw;
  }

  &__image {
    max-width: 40%;
    object-fit: cover;
    border-radius: 50%;
  }

  &__info {
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
  }

  &__name {
    text-align: center;
    font-weight: value($font-weight, semibold);
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.5rem;
  }
}
</style>

<template>
  <Tilt
    class="option"
    :key="id"
    :style="{ '--background': getColor(random).background, '--foreground': getColor(random).foreground }"
    @click="onClickOption(id)"
  >
    <img class="option__image" v-if="speaker && speaker.value" :src="`https://unavatar.io/${speaker.value.twitter}`" />
    <img class="option__image" v-else :src="`/images/users/user${randomUserPick}.png`" />
    <div class="option__info">
      <span class="option__name" v-if="isLoading"> loading... </span>
      <span class="option__name" v-else-if="speaker && speaker.value"> {{ speaker.value.twitter }}</span>
      <span class="option__name" v-else>""Click to reveal"" </span>

      <ul class="option__tags">
        <li class="option__tag" v-for="name in categories" :key="name">{{ name }}</li>
        <li class="option__tag" v-for="name in technologies" :key="name">{{ name }}</li>
      </ul>
    </div>

    <!-- <span class="option__name" v-if="isLoading"> loading... </span>
    <span class="option__name" v-else-if="speaker && speaker.value"> {{ speaker.value.twitter }}</span>
    <span class="option__name" v-else> Click... </span> -->
  </Tilt>
</template>
