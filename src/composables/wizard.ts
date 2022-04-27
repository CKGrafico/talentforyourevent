import qs from 'qs';
import { GITHUB_TOKEN } from '~/helpers';

export const wizardEventTypes = ref(null);
export const wizardCategories = ref(null);
export const wizardTechnologies = ref(null);

export async function getEventTypes() {
  try {
    const response = await useFetch('/api/wizard/event-types', {
      headers: {
        [GITHUB_TOKEN]: useCookie(GITHUB_TOKEN).value
      }
    });

    wizardEventTypes.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getWizardCategories() {
  try {
    const response = await useFetch('/api/wizard/categories', {
      headers: {
        [GITHUB_TOKEN]: useCookie(GITHUB_TOKEN).value
      }
    });

    wizardCategories.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getWizardTechnologies(categories) {
  try {
    const response = await useFetch(
      `/api/wizard/technologies?${qs.stringify({ categories }, { arrayFormat: 'brackets' })}`,
      {
        headers: {
          [GITHUB_TOKEN]: useCookie(GITHUB_TOKEN).value
        }
      }
    );

    wizardTechnologies.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getWizardSpeakers(technologies, categories) {
  try {
    const response = await useFetch(
      `/api/wizard/speakers?${qs.stringify({ categories, technologies }, { arrayFormat: 'brackets' })}`,
      {
        headers: {
          [GITHUB_TOKEN]: useCookie(GITHUB_TOKEN).value
        }
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getSpeakerLink(id) {
  try {
    const response = await useFetch(`/api/wizard/speaker?id=${id}`, {
      headers: {
        [GITHUB_TOKEN]: useCookie(GITHUB_TOKEN).value
      }
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
}
