import axios from 'axios';

const $host = axios.create({
	baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
});

const $authHost = axios.create({
	baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
});

const authInterceptor = (config) => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
