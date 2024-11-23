const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Question } = require('../models/index')
const { validateIsNull, validateObjectIsNull, validateCheck } = require('../validators/isNullValidator')

class questionController {
    async create(req, res, next) {
        try {
            const questions = Array.isArray(req.body) ? req.body : [req.body]
            validateObjectIsNull(questions)
            const questionsData = await Question.bulkCreate([...questions])
            res.json({ message: questions.length === 1 ? 'Вопрос добавлен' : 'Вопросы добавлены', questionsData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.massage}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const questions = await Question.findAll()
            res.json(questions)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.massage}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id вопроса')
            const isDelete = await Question.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Вопрос не найден')
            res.json({ message: 'Вопрос удален' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.massage}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id вопроса')
            const { question, answer, imageId } = req.body;
            validateIsNull([id, question, answer]);
            const isUpdate = await Question.update(
                {
                    question: question,
                    answer: answer,
                    imageId: imageId
                },
                {
                    where: {
                        id: id,
                    }
                }
            );
            validateCheck(!isUpdate[0], 'Вопрос не найден')
            res.json({ message: 'Вопрос обновлен' });
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`));
        }
    }
}

module.exports = new questionController()
