export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  departmentId: number | null;
  status: 'active' | 'inactive' | 'pending';
  roles: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId?: number;
}