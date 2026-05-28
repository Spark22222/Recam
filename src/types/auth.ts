import type { UserRole } from "../data/mockUsers"

export interface LoginRequest {
    email: string
    password: string
}

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
}

export interface LoginResponse {
    accessToken: string
    user: User
}