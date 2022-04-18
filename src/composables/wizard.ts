import qs from 'qs';

export const wizardEventTypes = ref(null);
export const wizardCategories = ref(null);
export const wizardTechnologies = ref(null);

export async function getEventTypes() {
  try {
    const response = await useFetch('/api/wizard/event-types', {
      headers: useRequestHeaders(['cookie'])
    });
    wizardEventTypes.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getWizardCategories() {
  try {
    const response = await useFetch('/api/wizard/categories', {
      headers: useRequestHeaders(['cookie'])
    });
    wizardCategories.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getWizardTechnologies(categories) {
  try {
    const response = await useFetch(
      `/api/wizard/technologies?${qs.stringify({ categories: categories }, { arrayFormat: 'brackets' })}`,
      {
        headers: useRequestHeaders(['cookie'])
      }
    );
    wizardTechnologies.value = response.data;
  } catch (e) {
    console.error(e);
  }
}
