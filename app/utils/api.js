/**
 * API utility for making requests to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
        throw new Error(data.error || data.message || 'An error occurred');
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
    login: (credentials) => apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    register: (userData) => apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    verifyToken: () => apiRequest('/auth/verify-token'),
  },
  
  // User endpoints
  users: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      return apiRequest(`/users${queryParams ? `?${queryParams}` : ''}`);
    },
    getById: (id) => apiRequest(`/users/${id}`),
    create: (userData) => apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    update: (id, userData) => apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
    delete: (id) => apiRequest(`/users/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // Task endpoints
  tasks: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      return apiRequest(`/tasks${queryParams ? `?${queryParams}` : ''}`);
    },
    getPaginated: (page = 1, limit = 5, filters = {}) => {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      return apiRequest(`/tasks/paginated?${queryParams}`);
    },
    getById: (id) => apiRequest(`/tasks/${id}`),
    create: (taskData) => apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),
    update: (id, taskData) => apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),
    bulkUpdate: (taskIds, updateData) => apiRequest('/tasks/bulk-update', {
      method: 'PUT',
      body: JSON.stringify({
        taskIds,
        updateData
      }),
    }),
    delete: (id) => apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    }),
    bulkDelete: (taskIds) => apiRequest('/tasks/bulk-delete', {
      method: 'DELETE',
      body: JSON.stringify({ taskIds }),
    }),
  },
};

export default api;