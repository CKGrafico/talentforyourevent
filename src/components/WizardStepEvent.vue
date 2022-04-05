<script setup>
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();

function onClickOption(option) {
  wizardStore.addEvent(option);
}

const { data } = await useFetch('/api/wizard/event-types');
</script>

<template>
  <div>
    <span @click="onClickOption"> {{ data }} </span>
  </div>
</template>
