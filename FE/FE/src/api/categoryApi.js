const API_URL = 'http://localhost:3000/api/v1/categories';

export const getCategories = async (language = 'vi') => {
  try {
    const response = await fetch(`${API_URL}?language=${language}`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const result = await response.json();
    return result.data; // The array is inside the data property
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
