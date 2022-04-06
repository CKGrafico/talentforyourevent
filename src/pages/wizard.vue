<script setup>
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const user = await useGithubUser();
const wizardStore = useWizardStore();

checkIfUserIsLogged(user);
</script>

<style>
@import '~/styles/variables.css';

.wizard {
  max-width: rem(1280px);
  max-height: rem(720px);
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__step {
    width: 100%;
  }

  &__title,
  &__subtitle {
    text-align: center;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__option {
    border: 2px solid var(--foreground);
    border-radius: 0.75rem;
    color: value($color-basic, bright);
    cursor: pointer;
    display: flex;
    font-weight: value($font-weight, bold);
    font-size: value($font-size, l);
    justify-content: center;
    align-items: center;
    margin: 1rem;
    min-height: 6rem;
    min-width: 12rem;
    padding: 1rem;
    transform: perspective(500px);
    transform-style: preserve-3d;
    transition: color value($time, slow), background-color value($time, slow);

    &:before {
      content: '';
      background-color: var(--background);
      border-radius: 1rem;
      border: 2px solid var(--foreground);
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      z-index: -1;
      opacity: 0.2;
    }

    &.is-selected {
      color: var(--foreground);
      background-color: var(--background);

      &:before {
        content: '';
        background-color: var(--background);
        border-color: transparent;
        opacity: 1;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  &__action {
    margin: 0 1rem;
    transition: all value($time, slow);

    &[disabled] {
      pointer-events: none;
      opacity: 0.75;
      filter: saturate(0.25);
    }
  }
}
</style>

<template>
  <div v-if="user" class="wizard">
    <WizardStepEvent v-if="wizardStore.currentStep === WizardStep.Events" />
    <WizardStepCategory v-if="wizardStore.currentStep === WizardStep.Categories" />
    <WizardStepTechnology v-if="wizardStore.currentStep === WizardStep.Technologies" />
  </div>
</template>
