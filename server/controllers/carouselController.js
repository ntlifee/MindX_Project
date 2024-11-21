const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { CarouselData, QuestionGame, Question } = require('../models/index')

class CarouselController {
	async create(req, res, next) {
		try {
			const { gameId, scoreFirst, scoreSuccess,
				scoreFailure, questionGame } = req.body

			//Добавление асинхронно в БД
			const carouselData = await Promise.all([
				CarouselData.create({ gameId, scoreFirst, scoreSuccess, scoreFailure }),
				QuestionGame.bulkCreate([...questionGame]),
			]);

			res.json(carouselData)
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка создания: ${error.massage}`))
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('Не задан id игры'));
			}

			const carouselData = await Promise.all([
				CarouselData.findOne({
					where: {
						gameId: id,
					},
					attributes: {
						exclude: ['gameId'],
					},
				}),
				QuestionGame.findAll({
					where: {
						gameId: id,
					},
					attributes: {
						exclude: ['gameId'],
					},
				}),
			]);
			res.json(carouselData);
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
				return next(ApiError.badRequest('Не задан id вопроса'));
			}

			const count = await Question.destroy({
				where: {
					id: id,
				},
			});

			if (!count) {
				return next(ApiError.badRequest('Вопрос не найден'));
			}
			res.json({ message: 'Вопрос удален' });
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

			const { scoreFirst, scoreSuccess,
				scoreFailure, questionGame } = req.body

			//Добавление асинхронно в БД
			const isUpdate = await Promise.all([
				CarouselData.update(
					{
						scoreFirst: scoreFirst,
						scoreSuccess: scoreSuccess,
						scoreFailure: scoreFailure,
					},
					{
						where: {
							gameId: id,
						}
					}
				),
				questionGame.forEach(item => {
					QuestionGame.update(
						{
							questionId: item.questionId,
							numberQuestion: item.numberQuestion
						},
						{
							where: {
								id: item.id,
							}
						}
					)
				})
			]);

			if (!isUpdate[0][0]) {
				return next(ApiError.badRequest('Данные игры не найдены'))
			}

			res.json({ message: 'Игра обновлена' });
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`));
		}
	}
}

module.exports = new CarouselController();
