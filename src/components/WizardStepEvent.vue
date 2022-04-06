<script setup>
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();

function onClickOption(option) {
  wizardStore.addEvent(option);
}

// qs.stringify({ categories: [1,2,3] }, { arrayFormat: 'brackets' })
const { eventTypes: data } = await useFetch('/api/wizard/event-types');
</script>

<template>
  <div>
    <span @click="onClickOption"> {{ eventTypes }} </span>
  </div>
</template>
