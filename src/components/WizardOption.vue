<script setup>
import { randomColor } from '~/helpers';

const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: false
  }
});

function getColor(value) {
  const hue = [0, 360];
  return randomColor(value, 1, hue);
}
</script>

<style scoped>
@import '~/styles/variables.css';
.option {
  $radius: 0.75rem;

  align-items: center;
  background-color: value($color-basic, brightest);
  box-shadow: 0 0 0px 2px transparent;
  border-radius: $radius;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  min-height: 8rem;
  min-width: 14rem;
  padding: 0.35rem;
  transform: perspective(500px);
  transform-style: preserve-3d;
  transition: box-shadow calc(value($time, slow) / 2) value($time, normal);
  position: relative;
  overflow: hidden;

  &.is-selected {
    box-shadow: 0 0 0px 2px value($color-basic, brightest);
  }

  &__icon {
    $size: 3rem;

    height: $size;
    width: $size;
    text-align: center;
    margin-top: 0.5rem;
    padding-top: 0.5rem;

    :deep(path) {
      transition: fill value($time, slow);
      fill: var(--background);
    }
  }

  &.is-selected &__icon {
    :deep(path) {
      fill: var(--foreground);
    }
  }

  &__name {
    color: value($color-basic, brightest);
    font-size: value($font-size, m);
    background-color: var(--background);
    border-radius: $radius;
    padding: 0.75rem;
    text-align: center;
    width: 100%;

    &:before {
      content: '';
      width: 90%;
      height: 0;
      border-radius: $radius;
      position: absolute;
      background-color: var(--background);
      transition: all value($time, slow);
      top: 90%;
      left: 5%;
      z-index: -1;
    }
  }

  &.is-selected &__name {
    color: var(--foreground);
    font-weight: value($font-weight, bold);

    &:before {
      width: 110%;
      height: 110%;
      top: -5%;
      left: -5%;
    }
  }
}
</style>

<template>
  <Tilt
    :class="`option ${isSelected ? 'is-selected' : ''}`"
    :key="id"
    :style="{ '--background': getColor(name).background, '--foreground': getColor(name).foreground }"
  >
    <span class="option__icon" v-html="icon"></span>
    <span class="option__name">{{ name }}</span>
  </Tilt>
</template>
