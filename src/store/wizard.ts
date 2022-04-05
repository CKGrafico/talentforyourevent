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
    addEvent(event: number) {
      this.events = this.events || [];
      this.events.filter((x) => x !== event).push(event);
    },
    addCategory(category: number) {
      this.categories = this.categories || [];
      this.categories.filter((x) => x !== category).push(category);
    },
    addTechnology(technology: number) {
      this.technologies = this.technologies || [];
      this.technologies.filter((x) => x !== technology).push(technology);
    }
  }
});
