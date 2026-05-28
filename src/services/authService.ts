import { mockUsers, type MockUser } from '../data/mockUsers';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

const REGISTERED_USERS_KEY = 'registeredUsers';

const getRegisteredUsers = (): MockUser[] => {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    const parsedUsers = JSON.parse(storedUsers);

    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers as MockUser[];
  } catch {
    return [];
  }
};

const saveRegisteredUsers = (users: MockUser[]) => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

const getAllUsers = (): MockUser[] => {
  return [...mockUsers, ...getRegisteredUsers()];
};

const createAccessToken = (userId: string): string => {
  return `mock-token-${userId}-${Date.now()}`;
};

const buildLoginResponse = (user: MockUser): LoginResponse => {
  return {
    accessToken: createAccessToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const login = ({ email, password }: LoginRequest): LoginResponse | null => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = getAllUsers().find(
    (mockUser) =>
      mockUser.email.toLowerCase() === normalizedEmail &&
      mockUser.password === password,
  );

  if (!user) {
    return null;
  }

  return buildLoginResponse(user);
};

export const register = ({
  name,
  email,
  password,
  role,
}: RegisterRequest): LoginResponse | null => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = getAllUsers().find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (existingUser) {
    return null;
  }

  const newUser: MockUser = {
    id: `registered-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
  };

  const registeredUsers = getRegisteredUsers();
  saveRegisteredUsers([...registeredUsers, newUser]);

  return buildLoginResponse(newUser);
};