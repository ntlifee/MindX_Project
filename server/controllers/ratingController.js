const { Sequelize, where, Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, QuestionGame, User, AccessGame, Role } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')


class ratingController {
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id игры')
            let rating = await User.findAll({
                attributes: ['id', 'username'],
                include: [{
                    model: UserAnswer,
                    attributes: [
                        'points',
                        'isCorrect',
                        [Sequelize.literal('"userAnswers->questionGame"."numberQuestion"'), 'numberQuestion']
                    ],
                    required: false,
                    include: [{
                        model: QuestionGame,
                        attributes: [],
                        required: true,
                        where: {
                            gameId: id
                        }
                    }]
                }, {
                    model: Role,
                    attributes: [],
                    required: true,
                    include: [{
                        model: AccessGame,
                        attributes: [],
                        required: true,
                        where: {
                            gameId: id
                        }
                    }]
                }],
                order: [
                    [Sequelize.literal('"userAnswers->questionGame"."numberQuestion"'), 'ASC']
                ]
            })
            rating = rating.map(user => {
                let totalPoints = 0;
                user.userAnswers.forEach(answer => {
                    if (answer.isCorrect) {
                        totalPoints += answer.points;
                    }
                });
                user = user.toJSON()
                user.totalPoints = totalPoints;
                return user
            }).sort((a, b) => b.totalPoints - a.totalPoints);

            const countQuestion = await QuestionGame.count({
                where: {
                    gameId: id
                },
            })

            res.json({ countQuestion, rating })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }
}

module.exports = new ratingController()

