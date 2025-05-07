import { API } from '@mindx/http/API';

const ratingTemplate = {
	type: 'rating',
	label: 'Игры',
	api: API.rating,
	fileds: [
		{ type: 'position', label: '№', meta: 'number' },
		{ type: 'username', label: 'Имя пользователя', meta: 'string' },
		{ type: 'pointsAnswer', label: 'Очки за ответы', meta: 'number' },
		{ type: 'pointsBonuses', label: 'Бонусные очки', meta: 'number' },
		{ type: 'totalPoints', label: 'Всего очков', meta: 'number' },
	],
};

export const templates = {
  rating: ratingTemplate,
};