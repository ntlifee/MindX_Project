import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $authHost.get('/api/admin/game');
	return data;
};

const getById = async (id) => {
	const { data } = await $authHost.get(`/api/admin/game/${id}`);
	return data;
};

export const gameAPI = {
	getList,
	getById,
};
