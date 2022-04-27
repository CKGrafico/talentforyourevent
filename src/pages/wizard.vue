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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;

  @media screen and (min-width: value($media, s)) {
    max-width: rem(1280px);
  }

  &__step {
    width: 100%;
  }

  &__title,
  &__subtitle {
    text-align: center;
    font-weight: value($font-weight, semibold);
    margin-bottom: 0.5rem;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    <WizardBreadCrumb
      :items="Object.values(WizardStep).filter((x) => typeof x === 'string')"
      :selected="WizardStep[wizardStore.currentStep]"
    />

    <template v-if="wizardStore.currentStep === WizardStep.Events">
      <Suspense>
        <WizardStepEvent />
        <template #fallback> Loading... </template>
      </Suspense>
    </template>

    <template v-if="wizardStore.currentStep === WizardStep.Categories">
      <Suspense>
        <WizardStepCategory />
        <template #fallback> Loading... </template>
      </Suspense>
    </template>

    <template v-if="wizardStore.currentStep === WizardStep.Technologies">
      <Suspense>
        <WizardStepTechnology />
        <template #fallback> Loading... </template>
      </Suspense>
    </template>
  </div>
</template>
