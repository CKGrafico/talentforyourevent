<script>
// From https://github.com/ThatNerdUKnow/vanilla-tilt-vue/blob/main/src/components/tilt.vue
import VanillaTilt from 'vanilla-tilt';
export default {
  name: 'Tilt',
  data: function () {
    return {};
  },
  mounted() {
    VanillaTilt.init(this.$refs.tiltRef, this.options);
  },
  props: {
    options: Object,
    parallax: Boolean
  }
};
</script>

<style>
.preserve {
  transform-style: preserve-3d;
}
</style>

<template>
  <div :class="parallax ? 'preserve' : ''" id="tiltMe" ref="tiltRef">
    <slot></slot>
  </div>
</template>
