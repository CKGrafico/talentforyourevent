<script setup>
import { SkeletonBlock } from 'skeleton-elements/vue';
</script>

<style scoped>
.loading {
  &__options {
    padding-top: 1rem;
  }

  &__box {
    margin: 1rem;
    border-radius: 0.75rem;
  }
}
</style>

<template>
  <div class="wizard__step loading">
    <skeleton-block tag="h1" class="wizard__title" width="80vw" effect="wave" />
    <skeleton-block tag="h2" class="wizard__subtitle" width="70vw" effect="wave" />
    <div class="wizard__options loading__options">
      <skeleton-block
        class="loading__box"
        width="22vw"
        height="12vw"
        effect="wave"
        v-for="value in [1, 2, 3, 4, 5, 6]"
        :key="value"
      />
    </div>
  </div>
</template>
