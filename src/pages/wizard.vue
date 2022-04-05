<script setup>
import { WizardStep } from '~/models/wizard';
import { useWizardStore } from '~/store/wizard';

const user = await useGithubUser();
const wizardStore = useWizardStore();

checkIfUserIsLogged(user);
</script>

<template>
  <div v-if="user">
    <WizardStepEvent v-if="wizardStore.currentStep === WizardStep.Events" />
    <!-- <WizardStepCategory/>
    <WizardStepTechnology/> -->
  </div>
</template>
