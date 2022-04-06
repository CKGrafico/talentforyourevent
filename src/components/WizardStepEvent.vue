<script setup>
import { getEventTypes, wizardEventTypes } from '#imports';
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();
const eventTypes = wizardEventTypes;

function onClickOption(option) {
  wizardStore.addEvent(option);
}

await getEventTypes();
</script>

<template>
  <div v-if="eventTypes" class="wizard__step">
    <span class="wizard__option" v-for="{ id, name } in eventTypes.value" :key="id" @click="onClickOption">
      {{ name }}
    </span>
  </div>
  <div v-else>loading</div>
</template>
