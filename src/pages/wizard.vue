<script setup>
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const user = await useGithubUser();
const wizardStore = useWizardStore();

checkIfUserIsLogged(user);
</script>

<style>
.wizard {
  max-width: rem(1280px);
  max-height: rem(720px);
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>

<template>
  <div v-if="user" class="wizard">
    <WizardStepEvent v-if="wizardStore.currentStep === WizardStep.Events" />
    <!-- <WizardStepCategory/>
    <WizardStepTechnology/> -->
  </div>
</template>
