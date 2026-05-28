export type UserRole = 'admin' | 'photographyCompany' | 'user';

export type RegisterRole = 'photographyCompany' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: RegisterRole;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}