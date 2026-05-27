export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  listingCases: {
    base: '/listing-cases',
    detail: (id: string) => `/listing-cases/${id}`,
  },
  media: {
    upload: '/media/upload',
  },
  users: {
    base: '/users',
  },
} as const;