import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $host.get('/api/admin/userAnswer');
	return data;
};

const getById = async (id) => {
	const { data } = await $host.get(`/api/admin/userAnswer/${id}`);
	return data;
};

export const userAnswerAPI = {
	getList,
	getById,
};
