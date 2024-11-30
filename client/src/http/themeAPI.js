import { $host, $authHost } from './index';

const getList = async () => {
	const data = await $host.get('/api/admin/theme');
	return data;
};

const getById = async (id) => {
	const data = await $host.get(`/api/admin/theme/${id}`);
	return data;
};

export const themeAPI = {
	getList,
	getById,
};
