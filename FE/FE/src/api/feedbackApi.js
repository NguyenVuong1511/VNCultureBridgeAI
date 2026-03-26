const BASE_URL = 'http://localhost:3000/api/v1';

export const feedbackApi = {
  getPublicFeedbacks: async () => {
    try {
      const response = await fetch(`${BASE_URL}/feedback?type=CHUNG`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch public feedbacks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      return { success: false, data: [] };
    }
  },

  submitFeedback: async (feedbackData) => {
    try {
      const currentAcc = JSON.parse(localStorage.getItem('CurrentAcc'));
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // If the BE expects a token, we might need to attach it here
      // But the BE feedback create endpoint does not require auth middleware
      // Currently, it gets sessionId from request. We can still pass it.
      
      const payload = {
        type: 'CHUNG',
        rating: feedbackData.rating,
        content: feedbackData.text
      };

      const response = await fetch(`${BASE_URL}/feedback`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Failed to submit feedback');
      return await response.json();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return { success: false };
    }
  }
};
