import { API } from '@mindx/http/API';

const questionTemplate = {
	type: 'question',
	label: 'Вопросы',
	api: API.question,
	fileds: [
		{ type: 'question', label: 'Вопрос', meta: 'string' },
		{ type: 'answer', label: 'Ответ', meta: 'string' },
		{ type: 'imageId', label: 'Изображение', meta: 'img' },
	],
};

const gameTemplate = {
	type: 'game',
	label: 'Игры',
	api: API.game,
	fileds: [
		{ type: 'typeGame', label: 'Тип', meta: 'string' },
		{ type: 'name', label: 'Название', meta: 'string' },
		{ type: 'startDate', label: 'Дата начала', meta: 'datetime' },
		{ type: 'endDate', label: 'Дата окончания', meta: 'datetime' },
		{ type: 'imageId', label: 'Изображение', meta: 'img' },
	],
};

const themeTemplate = {
	type: 'theme',
	label: 'Темы',
	api: API.theme,
	fileds: [
		{ type: 'name', label: 'Название', meta: 'string' },
	],
};

const userTemplate = {
	type: 'user',
	label: 'Пользователи',
	api: API.user,
	fileds: [
		{ type: 'username', label: 'Имя пользователя', meta: 'string' },
		{ type: 'role_name', label: 'Роль', meta: 'string'}
	],
};

const userAnswerTemplate = {
	type: 'userAnswer',
	label: 'Ответы пользователей',
	api: API.userAnswer,
	fileds: [
		{ type: 'questionNumber', label: 'Номер вопроса', meta: 'int' },
		{ type: 'userAnswer', label: 'Ответ', meta: 'string' },
		{ type: 'points', label: 'Очки', meta: 'int' },
		{ type: 'isCorrect', label: 'Правильно', meta: 'bool' },
	],
};

const roleTemplate = {
	type: 'role',
  label: 'Роли',
  api: API.role,
  fileds: [
    { type: 'name', label: 'Название', meta: 'string' },
  ],
};

export const templates = {
	question: questionTemplate,
	game: gameTemplate,
	theme: themeTemplate,
	user: userTemplate,
	userAnswer: userAnswerTemplate,
	role: roleTemplate,
};
