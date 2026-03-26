const API_URL = 'http://localhost:3000/api/v1/ethnic-groups';

export const getEthnicGroups = async (language = 'vi') => {
  try {
    const response = await fetch(`${API_URL}?language=${language}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ethnic groups');
    }
    const result = await response.json();
    return result.data; // The array is inside the data property
  } catch (error) {
    console.error('Error fetching ethnic groups:', error);
    throw error;
  }
};
