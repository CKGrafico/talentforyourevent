//Component from https://gist.github.com/AnoRebel/0690388ca901523d51476fd35d3037ab
<template>
  <nav class="wizardbreadcrumbs__navbar" aria-label="Breadcrumb">
    <ul class="wizardbreadcrumbs__list">
      <li class="wizardbreadcrumbs__itemlist" v-for="(item, index) in items" :key="index">
        <svg v-if="index != 0" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24">
          <path d="m 12,6 10,10 -10,10 z" :fill="getColor(index)" />
        </svg>
        <span v-if="item == selected" class="wizardbreadcrumbs__item wizardbreadcrumbs__selected">{{ item }}</span>
        <span v-else="" class="wizardbreadcrumbs__item">{{ item }}</span>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Breadcrumbs',
  methods: {
    getColor(index) {
      const colors = ['#13678a', '#9aeba3', '#dafdba'];
      index = index % colors.length;

      return colors[index];
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: true,
      default: 'Events'
    }
  }
};
</script>
