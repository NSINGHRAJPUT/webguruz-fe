/**
 * API utility for making requests to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

/**
 * Make a request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<any>} - Response data
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Handle API errors
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }
      
      return data;
    } else {
      // Handle non-JSON responses (like file downloads)
      if (!response.ok) {
        throw new Error('An error occurred');
      }
      return response;
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * API service with methods for common operations
 */
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiRequest('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }), 
    register: (userData) => apiRequest('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
  
  // User endpoints
  users: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      return apiRequest(`/api/users${queryParams ? `?${queryParams}` : ''}`);
    },
    getById: (id) => apiRequest(`/api/users/${id}`),
    create: (userData) => apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    update: (id, userData) => apiRequest(`/api/users/status`, {
      method: 'PUT',
      body: JSON.stringify({ ...userData, id }),
    }),
    delete: (id) => apiRequest(`/api/users/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // Task endpoints
  tasks: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      return apiRequest(`/api/tasks${queryParams ? `?${queryParams}` : ''}`);
    },
    getById: (id) => apiRequest(`/api/tasks/${id}`),
    create: (taskData) => apiRequest('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),
    update: (id, taskData) => apiRequest(`/api/tasks/${id}`, {
      method: 'PUT', 
      body: JSON.stringify(taskData),
    }),
    delete: (id) => apiRequest(`/api/tasks/${id}`, {
      method: 'DELETE',
    }),
    bulkUpdate: (tasksData) => apiRequest('/api/tasks/bulk', {
      method: 'PATCH',
      body: JSON.stringify(tasksData),
    }),
  },
};

export default api;