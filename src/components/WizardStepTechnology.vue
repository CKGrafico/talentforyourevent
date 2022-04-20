<script setup>
import { getWizardTechnologies, wizardTechnologies } from '#imports';
import { randomColor } from '~/helpers';
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();
const technologies = wizardTechnologies;
const MIN_TO_SEND = 0;
const MAX_TO_SEND = 3;

function getColor(value) {
  const hue = [198, 200];
  return randomColor(`technology ${value * 10}`, 1, hue);
}

function isSelected(id) {
  return wizardStore.technologies?.includes(id);
}

function onClickOption(id) {
  wizardStore.toggleTechnology(id);
}

function onClickPreviousStep() {
  wizardStore.resetTechnologies();
  wizardStore.setStep(WizardStep.Categories);
}

async function onClickNextStep() {
  const speakers = await getWizardSpeakers(wizardStore.technologies, wizardStore.categories);
  debugger;
}

await getWizardTechnologies(wizardStore.categories);
</script>

<template>
  <div v-if="technologies" class="wizard__step">
    <div class="wizard__breadcrumbs">
      <WizardBreadCrumbs
        :items="Object.values(WizardStep).filter((x) => typeof x === 'string')"
        :selected="WizardStep[wizardStore.currentStep]"
      />
    </div>
    <h1 class="wizard__title">{{ $t('wizard.category.title') }}</h1>
    <h2 class="wizard__subtitle">{{ $t('wizard.category.subtitle') }}</h2>

    <div class="wizard__options">
      <WizardOption
        v-for="{ id, name, icon } in technologies.value"
        :name="name"
        :id="id"
        :icon="icon"
        :key="id"
        :is-selected="isSelected(id)"
        :is-disabled="wizardStore.technologies && wizardStore.technologies?.length >= MAX_TO_SEND"
        @click="onClickOption(id)"
      />
    </div>

    <div class="wizard__actions">
      <button class="button button--primary" @click="onClickPreviousStep()">
        {{ $t('wizard.back') }}
      </button>

      <button
        class="wizard__action button button--primary-bright"
        @click="onClickNextStep()"
        :disabled="
          !wizardStore.technologies ||
          wizardStore.technologies?.length < MIN_TO_SEND ||
          wizardStore.technologies?.length > MAX_TO_SEND
        "
      >
        {{ $t('wizard.next') }}
      </button>
    </div>
  </div>
  <div v-else>loading</div>
</template>
