<script setup>
import { useWizardStore } from '~/store/wizard';

const wizardStore = useWizardStore();
const revealed = ref(0);

const speakers = await getWizardSpeakers(wizardStore.technologies, wizardStore.categories);

function onReveal() {
  revealed.value += 1;
}
</script>

<template>
  <div v-if="speakers" class="wizard__step">
    <h1 class="wizard__title">{{ $t('wizard.speakers.title') }}</h1>
    <h2 class="wizard__subtitle">{{ $t('wizard.speakers.subtitle') }}</h2>

    <div class="wizard__options">
      <WizardOptionSpeaker
        v-for="{ id, technologies, categories } in speakers"
        :id="id"
        :technologies="technologies.map((x) => x.name).slice(0, 3)"
        :categories="categories.map((x) => x.name).slice(0, 3)"
        :key="id"
        :revealed="revealed"
        @reveal="onReveal"
      />
    </div>
  </div>
</template>
