import { defineStore } from 'pinia';
import { WizardStep } from '~/models/wizard';

type State = {
  events: number[];
  categories: number[];
  technologies: number[];
  currentStep: WizardStep;
};

export const useWizardStore = defineStore({
  id: 'wizard',
  state: (): State => ({
    events: null,
    categories: null,
    technologies: null,
    currentStep: WizardStep.Events
  }),
  actions: {
    toggleEvent(id: number) {
      this.events = this.events || [];

      if (this.events.includes(id)) {
        this.events = this.events.filter((x) => x !== id);
        return;
      }

      this.events.push(id);
    },
    toggleCategory(id: number) {
      this.categories = this.categories || [];

      if (this.categories.includes(id)) {
        this.categories = this.categories.filter((x) => x !== id);
        return;
      }

      this.categories.push(id);
    },
    toggleTechnology(id: number) {
      this.technologies = this.technologies || [];

      if (this.technologies.includes(id)) {
        this.technologies = this.technologies.filter((x) => x !== id);
        return;
      }

      this.technologies.push(id);
    },
    setStep(step: WizardStep) {
      this.currentStep = step;
    },
    resetTechnologies() {
      this.technologies = null;
    },
    resetCategories() {
      this.categories = null;
    }
  }
});
