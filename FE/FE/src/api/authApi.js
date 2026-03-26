const BASE_URL = 'http://localhost:3000/api/v1';

async function request(path, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: result?.message || 'Request failed',
        errors: result?.errors || null
      };
    }

    return result;
  } catch (error) {
    console.error('Auth API error:', error);
    return {
      success: false,
      status: 500,
      message: 'Cannot connect to backend'
    };
  }
}

export const authApi = {
  login: async (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  register: async (payload) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  getMe: async (token) => request('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),

  changePassword: async (token, payload) => request('/auth/change-password', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
};
