import api from '../../api/axios';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../../shared/types/auth.types';

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>('/auth/login', data);

export const register = (data: RegisterRequest) =>
  api.post<AuthResponse>('/auth/register', data);

export const logoutApi = () => api.post('/auth/logout');
