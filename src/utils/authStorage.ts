import type { LoginResponse, User } from '../types/auth';

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export const saveAuthData = ({ accessToken, user }: LoginResponse) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
};

export const getUserRole = (): string | null => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return user.role;
};

export const clearAuthData = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return Boolean(getAccessToken());
};