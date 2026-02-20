import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import { store } from '../app/store';
import { logout, setCredentials } from '../features/auth/authSlice';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const err = error as AxiosError & { config?: any };
    const originalRequest = err.config;

    // ❗️ Якщо це сам refresh — не намагатися знову
    if (originalRequest?.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (err.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.get('/auth/refresh');
        store.dispatch(setCredentials());
        return axiosInstance(originalRequest);
      } catch {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);

export const api = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.get<T>(url, config);
    return res.data;
  },

  async post<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  },

  async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data;
  },
};

export default api;
