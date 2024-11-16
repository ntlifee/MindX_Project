import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $host.get('/api/admin/questions');
	return data;
};

const getById = async (id) => {
	const { data } = await $host.get(`/api/admin/questions/${id}`);
	return data;
};

export const questionAPI = {
	getList,
	getById,
};
