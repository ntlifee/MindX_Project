import { $host, $authHost } from './index';
import { jwtDecode } from 'jwt-decode';

const getList = async () => {
    const { data } = await $authHost.get('/api/admin/user');
    for(const user of data) {
        user.role_name = user.role.name;
    }
    return data;
};

const getById = async (id) => {
    const { data } = await $authHost.get(`/api/admin/user/${id}`);
    return data;
};

const SignIn = async (username, password) => {
    const { data } = await $host.post(`/api/user/signin`, { username, password });
    localStorage.setItem(`token`, data.token);
    return jwtDecode(data.token);
};

const SignUp = async (username, password, repeatPassword) => {
    const { data } = await $host.post(`/api/user/signup`, { username, password, repeatPassword });
    localStorage.setItem(`token`, data.token);
    return jwtDecode(data.token);
};

const check = async () => {
    const { data } = await $authHost.get(`/api/user/auth`);
    localStorage.setItem(`token`, data.token);
    return jwtDecode(data.token);
};

export const userAPI = {
  getList,
  getById,
  SignIn,
  SignUp,
  check
};