import type { UserRole } from '../types/auth';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Photography Company',
    email: 'company@example.com',
    password: '123456',
    role: 'photographyCompany',
  },
  {
    id: '3',
    name: 'Normal User',
    email: 'user@example.com',
    password: '123456',
    role: 'user',
  },
];