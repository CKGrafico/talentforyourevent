<script setup>
import { getEventTypes, wizardEventTypes } from '#imports';
import Tilt from 'vanilla-tilt-vue';
import { randomColor } from '~/helpers';
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();
const eventTypes = wizardEventTypes;

const MIN_TO_SEND = 1;

function getColor(value) {
  const hue = [198, 200];
  return randomColor(value, 1, hue);
}

function isSelected(id) {
  return wizardStore.events?.includes(id);
}

function onClickOption(id) {
  wizardStore.toggleEvent(id);
}

function onClickNextStep() {
  wizardStore.setStep(WizardStep.Categories);
}

await getEventTypes();
</script>

<template>
  <div v-if="eventTypes" class="wizard__step">
    <h1 class="wizard__title">{{ $t('wizard.event.title') }}</h1>
    <h2 class="wizard__subtitle">{{ $t('wizard.event.subtitle') }}</h2>
    <div class="wizard__options">
      <Tilt
        :class="`wizard__option ${isSelected(id) ? 'is-selected' : ''}`"
        v-for="{ id, name } in eventTypes.value"
        :key="id"
        @click="onClickOption(id)"
        :style="{ '--background': getColor(name).background, '--foreground': getColor(name).foreground }"
      >
        {{ name }}
      </Tilt>
    </div>

    <div class="wizard__actions">
      <button
        class="wizard__action button button--primary"
        @click="onClickNextStep()"
        :disabled="!wizardStore.events || wizardStore.events?.length < MIN_TO_SEND"
      >
        {{ $t('wizard.next') }}
      </button>
    </div>
  </div>
  <div v-else>loading</div>
</template>
