import AxiosInstance from './axios'

export const AuthApi = {
  me: () => AxiosInstance.get('/auth/me', { silent: true, silenceError: true }),
  login: (username: string, password: string) =>
    AxiosInstance.post('/auth/login', { username, password }, { message: 'Logowanie...' }),
  logout: () => AxiosInstance.post('/auth/logout', {}, { silent: true }),
  changePassword: (current_password: string, new_password: string) =>
    AxiosInstance.post('/auth/change-password', { current_password, new_password }, { message: 'Zapisywanie...' }),
  users: () => AxiosInstance.get('/admin/users', { silent: true }),
  createUser: (username: string, password: string) =>
    AxiosInstance.post('/admin/users', { username, password }, { message: 'Tworzenie użytkownika...' }),
  resetUserPassword: (id: number, password: string) =>
    AxiosInstance.post(`/admin/users/${id}/password`, { password }, { message: 'Zmiana hasła...' }),
  database: (q = '') => AxiosInstance.get(`/database?q=${encodeURIComponent(q)}`, { silent: true }),
  syncTask: (taskId: number | string) =>
    AxiosInstance.post(`/database/sync/${taskId}`, {}, { silent: true, silenceError: true }),
}
