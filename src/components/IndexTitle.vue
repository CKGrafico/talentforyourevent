<script setup>
const timestamp = ref(0);
const animationTime = 4000;

const props = defineProps({
  technologies: {
    type: Array,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const sortedTechnologies = ref(props.technologies);

function changeOrderOfTechnologies() {
  const now = performance.now();
  const delta = now - timestamp.value;

  if (!sortedTechnologies.value) {
    return;
  }

  if (delta > animationTime) {
    timestamp.value = now;
    const newTechnologies = [...sortedTechnologies.value];
    const first = newTechnologies.shift();
    newTechnologies.push(first);
    sortedTechnologies.value = newTechnologies;
  }

  requestAnimationFrame(changeOrderOfTechnologies);
}

changeOrderOfTechnologies();
</script>

<style scoped>
@import '~/styles/variables.css';

.title {
  font-family: $font-title;
  font-weight: value($font-weight, bold);
  font-size: $technology-size;
  max-width: 30rem;
  text-align: center;
  margin-top: 0;

  &__space {
    width: 15rem;
    display: inline-block;
  }

  &__technologies {
    position: absolute;
    height: calc($technology-size + 0.5rem);
    width: 100%;
    overflow: hidden;
  }

  &__technology {
    position: absolute;
    height: $technology-size;
    left: 0;
    margin-top: $technology-size;

    &--1 {
      margin-top: 0;
      animation: tech1 var(--time) ease-in-out infinite;

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
}
</style>
<template>
  <h1 class="title">
    {{ text }}
    <span v-if="sortedTechnologies" class="title__technologies">
      <span
        v-for="({ id, name }, index) in sortedTechnologies"
        :key="id"
        :class="`title__technology title__technology--${index + 1}`"
        :style="{ '--time': `${animationTime}ms` }"
        >{{ name }}</span
      >
    </span>
    <span class="title__space"></span>
  </h1>
</template>
