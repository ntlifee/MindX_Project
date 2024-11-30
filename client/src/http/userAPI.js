import { $host, $authHost } from './index';
import { jwtDecode } from 'jwt-decode';

const getList = async () => {
    const response = await $host.get('/api/admin/user');
    return response;
};

const getById = async (id) => {
    const response = await $host.get(`/api/admin/user/${id}`);
    return response;
};

const SingIn = async (username, password) => {
    const response = await $host.post(`/api/user/signin`, { username, password });
    console.log(response);
    return jwtDecode(response.data.token);
}

const SingUp = async (username, password, repeatPassword) => {
    const { response } = await $host.post(`/api/user/signup`, { username, password, repeatPassword });
    return jwtDecode(response.data.token);
}

export const userAPI = {
  getList,
  getById,
  SingIn,
  SingUp,
};