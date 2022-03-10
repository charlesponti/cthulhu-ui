import { AxiosResponse } from 'axios';
import api from '../api';
import { User } from './auth.types';

export interface LoginPayload {
  email: string;
  emailToken: string;
}

export function getUser(): Promise<AxiosResponse<User>> {
  return api.get('/me');
}

export function authenticate({ email, emailToken }: LoginPayload) {
  return api.post('/authenticate', { email, emailToken }).then((resp) => {
    console.log(resp.data);
    const { authToken } = resp.data;
    api.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    localStorage.setItem('token', authToken);
  });
}

export function logout() {
  return api.post('/logout').then(() => {
    api.defaults.headers.common.Authorization = false;
  });
}
