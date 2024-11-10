const { where } = require('sequelize')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError')
const { CarouselData, Question, Game } = require('../models/index')

class CarouselController {
	//Проверка массива на null и пустные строчки
	isArrayValid(arr) {
		return !arr.every((item) =>
			item.question_number &&
			item.question.trim() &&
			item.answer.trim()
		);
	}

	//Проверка данных на null и пустые строчки
	validateInputData(
		gameId,
		scoreFirst,
		scoreSuccess,
		scoreFailure,
		questionData,
		next
	) {
		if (
			!gameId ||
			!scoreFirst ||
			!scoreSuccess ||
			!scoreFailure ||
			!questionData.length ||
			isArrayValid(questionData)
		) {
			return next(ApiError.badRequest('Все поля должны быть заполнены!'));
		}
	}

	async create(req, res, next) {
		try {
			let { gameId, scoreFirst, scoreSuccess,
				scoreFailure, questionData } = req.body
			const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
			images.forEach(image => {
				let fileName = uuid.v4() + '.jpg'
				image.mv(path.resolve(__dirname, '..', 'static', fileName))
				questionData[image.name.split('.')[0]].image = fileName
			});
			validateInputData(gameId, scoreFirst, scoreSuccess, scoreFailure, questionData);

			//Добавление асинхронно в БД
			const carouselGameData = await Promise.all([
				CarouselData.create({ scoreFirst, scoreSuccess, scoreFailure }),
				Question.bulkCreate([...questionData]),
			]);

			res.json(carouselGameData)
		} catch (error) {
			console.log(error)
			return next(ApiError.badRequest(`Ошибка создания: ${error.massage}`))
		}
	}

	async getAll(req, res, next) {
		try {
			const carouselGames = await Game.findAll({
				where: {
					typeGameId: 2,
				},
				attributes: {
					exclude: ['typeGameId'],
				},
			});
			res.json(carouselGames);
		} catch (error) {
			return next(
				ApiError.badRequest(`Ошибка получения игр: ${error.massage}`)
			);
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('Не задан id игры'));
			}

			const isGame = await Game.findOne({
				where: { id },
				attributes: ['id'],
			}).then((token) => token === null);
			if (isGame) {
				return next(ApiError.badRequest('Игра не найдена'));
			}

			const carouselGameData = await Promise.all([
				CarouselData.findOne({
					where: {
						gameId: id,
					},
					attributes: {
						exclude: ['gameId', 'id'],
					},
				}),
				Question.findAll({
					where: {
						gameId: id,
					},
					attributes: {
						exclude: ['gameId', 'answer'],
					},
				}),
			]);
			res.json(carouselGameData);
		} catch (error) {
			return next(
				ApiError.badRequest(`Ошибка получения игры: ${error.massage}`)
			);
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('Не задан id игры'));
			}

			const count = await Game.destroy({
				where: {
					id: id,
				},
			});

			if (!count) {
				return next(ApiError.badRequest('Игра не найдена'));
			}
			res.json({ message: 'Игра удалена' });
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка удаления: ${error.massage}`));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('Не задан id игры'));
			}

			const isGame = await Game.findOne({
				where: { id },
				attributes: ['id'],
			}).then((token) => token === null);
			if (isGame) {
				return next(ApiError.badRequest('Игра не найдена'));
			}

			const { gameId, scoreFirst, scoreSuccess, scoreFailure, questionData } =
				req.body;
			validateInputData(
				gameId,
				scoreFirst,
				scoreSuccess,
				scoreFailure,
				questionData
			);

			//Добавление асинхронно в БД
			carouselGameData = await Promise.all([
				CarouselData.update({ scoreFirst, scoreSuccess, scoreFailure, gameId }),
				Question.update([...questionData]),
			]);

			res.json({ message: 'Игра обновлена', carouselGameData });
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`));
		}
	}
}

module.exports = new CarouselController();
