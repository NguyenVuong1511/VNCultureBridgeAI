const BASE_URL = 'http://localhost:3000/api/v1';

export const articleApi = {
  getFeaturedArticles: async (language = 'vi') => {
    try {
      const response = await fetch(`${BASE_URL}/articles?featured=true&pageSize=6`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch featured articles');
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return { success: false, data: [] };
    }
  }
};
