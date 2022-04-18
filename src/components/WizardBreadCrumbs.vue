<script setup>
//Component from https://gist.github.com/AnoRebel/0690388ca901523d51476fd35d3037ab
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selected: {
    type: String,
    required: true,
    default: 'Events'
  }
});
</script>
<style scoped>
@import '~/styles/variables.css';

.breadcrumb {
  display: flex;
  justify-content: flex-start;

  &__list {
    list-style: none;
    padding: 0.5rem;
    margin: 0;
  }

  &__item {
    display: inline-block;
  }

  &__separator {
    color: value($color-primary, semidarker);
    opacity: 0.5;
    margin-left: 0.75rem;
  }

  &__text {
    height: 100%;
    margin-left: 10px;
    color: value($color-primary, semidarker);
    opacity: 0.5;

    &.is-selected {
      opacity: 1;

      font-weight: bold;
    }
  }
}
</style>

<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ul class="breadcrumb__list">
      <li class="breadcrumb__item" v-for="(item, index) in items" :key="index">
        <span v-if="index != 0" class="breadcrumb__separator">/</span>
        <span :class="`breadcrumb__text ${item === selected ? 'is-selected' : ''}`">{{ item }}</span>
      </li>
    </ul>
  </nav>
</template>
