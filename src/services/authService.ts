import { mockUsers } from '../data/mockUsers';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const login = ({ email, password }: LoginRequest): LoginResponse | null => {
  const user = mockUsers.find(
    (mockUser) => mockUser.email === email && mockUser.password === password
  );

  if (!user) {
    return null;
  }

  const accessToken = `mock-token-${user.id}-${Date.now()}`;

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};