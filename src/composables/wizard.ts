export const wizardEventTypes = ref(null);

export async function getEventTypes() {
  try {
    // qs.stringify({ categories: [1,2,3] }, { arrayFormat: 'brackets' })
    const response = await useFetch('/api/wizard/event-types');
    wizardEventTypes.value = response.data;
  } catch (e) {
    console.error(e);
  }
}
