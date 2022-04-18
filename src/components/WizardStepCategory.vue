<script setup>
import { getWizardCategories, wizardCategories } from '#imports';
import { randomColor } from '~/helpers';
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();
const categories = wizardCategories;
const MIN_TO_SEND = 1;
const MAX_TO_SEND = 3;

function getColor(value) {
  const hue = [198, 200];
  return randomColor(`category ${value * 10}`, 1, hue);
}

function isSelected(id) {
  return wizardStore.categories?.includes(id);
}

function onClickOption(id) {
  wizardStore.toggleCategory(id);
}

function onClickPreviousStep() {
  wizardStore.resetCategories();
  wizardStore.setStep(WizardStep.Events);
}

function onClickNextStep() {
  wizardStore.setStep(WizardStep.Technologies);
}

await getWizardCategories();
</script>

<template>
  <div v-if="categories" class="wizard__step">
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
        v-for="{ id, name, icon } in categories.value"
        :name="name"
        :id="id"
        :icon="icon"
        :key="id"
        :is-selected="isSelected(id)"
        :is-disabled="wizardStore.categories && wizardStore.categories?.length >= MAX_TO_SEND"
        @click="onClickOption(id)"
      />
    </div>

    <div class="wizard__actions">
      <button class="button button--primary-darker" @click="onClickPreviousStep()">
        {{ $t('wizard.back') }}
      </button>

      <button
        class="wizard__action button button--primary"
        @click="onClickNextStep()"
        :disabled="
          !wizardStore.categories ||
          wizardStore.categories?.length < MIN_TO_SEND ||
          wizardStore.categories?.length > MAX_TO_SEND
        "
      >
        {{ $t('wizard.next') }}
      </button>
    </div>
  </div>
  <div v-else>loading</div>
</template>
