<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
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
    margin-top: 0;
  }
}
</style>
<template>
  <h1 class="title">
    {{ text }}
    <span class="title__technologies">
      <span class="title__technology">{{ name }}</span>
    </span>
    <span class="title__space"></span>
  </h1>
</template>
