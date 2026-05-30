export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  listingCases: {
    base: '/orders',
    detail: (id: string) => `/orders/${id}`,
  },
  media: {
    upload: '/media/upload',
  },
  users: {
    base: '/users',
  },
} as const;