
/**
 * Configuration settings for the application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.your-backend.com/api',
  TIMEOUT: 30000, // 30 seconds
};

// Application settings
export const APP_CONFIG = {
  APP_NAME: 'Habit Builder',
  APP_VERSION: '1.0.0',
};

// Feature flags
export const FEATURES = {
  ENABLE_SOCIAL: false,
  ENABLE_NOTIFICATIONS: false,
};

// Error messages
export const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong. Please try again later.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION: 'Please check the form for errors.',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
};
