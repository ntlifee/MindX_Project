import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $host.get('/api/admin/user');
	return data;
};

const getById = async (id) => {
	const { data } = await $host.get(`/api/admin/user/${id}`);
	return data;
};

export const userAPI = {
	getList,
	getById,
};
