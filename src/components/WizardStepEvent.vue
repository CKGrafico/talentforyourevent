<script setup>
import { getEventTypes, wizardEventTypes } from '#imports';
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();
const eventTypes = wizardEventTypes;

const MIN_TO_SEND = 1;

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
    <div class="wizard__breadcrumbs">
      <WizardBreadCrumbs
        :items="Object.values(WizardStep).filter((x) => typeof x === 'string')"
        :selected="WizardStep[wizardStore.currentStep]"
      />
    </div>

    <h1 class="wizard__title">{{ $t('wizard.event.title') }}</h1>
    <h2 class="wizard__subtitle">{{ $t('wizard.event.subtitle') }}</h2>

    <div class="wizard__options">
      <WizardOption
        v-for="{ id, name, icon } in eventTypes.value"
        :name="name"
        :id="id"
        :icon="icon"
        :key="id"
        :is-selected="isSelected(id)"
        @click="onClickOption(id)"
      />
    </div>

    <div class="wizard__actions">
      <button
        class="wizard__action button button--primary-bright"
        @click="onClickNextStep()"
        :disabled="!wizardStore.events || wizardStore.events?.length < MIN_TO_SEND"
      >
        {{ $t('wizard.next') }}
      </button>
    </div>
  </div>
  <div v-else>loading</div>
</template>
