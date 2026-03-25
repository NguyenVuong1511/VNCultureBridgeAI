const BASE_URL = 'http://localhost:3000/api/v1';

export const regionApi = {
  getRegions: async (language = 'vi') => {
    try {
      const response = await fetch(`${BASE_URL}/regions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch regions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching regions:', error);
      return { success: false, data: [] };
    }
  }
};
