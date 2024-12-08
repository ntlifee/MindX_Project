import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $host.get('/api/admin/question');
	return data;
};

const getById = async (id) => {
	const { data } = await $host.get(`/api/admin/question/${id}`);
	return data;
};

const update = async (model) => {
	const { data } = await $host.put(`/api/admin/question/${model.id}`, model);
	return data;
}

const deleteById = async (id) => {
	const { data } = await $host.delete(`/api/admin/question/${id}`);
	return data;
}

const addItem = async (item) => {
	const { data } = await $host.post(`/api/admin/question`, item);
  return data;
}

export const questionAPI = {
	getList,
	getById,
	update,
	deleteById,
};
