const { where, Sequelize } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, User, QuestionGame, Question, Game, Bonus } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')
const ratingController = require('./ratingController')


const BONUS = {
    'row': {
        '1': 50,
        '2': 50,
        '3': 50,
        '4': 50,
        '5': 50
    },
    'column': {
        '1': 10,
        '2': 20,
        '3': 30,
        '4': 40,
        '5': 50
    }
}


class userAnswerController {
    async create(req, res, next) {
        try {
            let { questionGameId, points, userAnswer, typeGame } = req.body
            const questionData = (await QuestionGame.findOne({
                attributes: ["numberQuestion"],
                include: [{
                    model: Question,
                    attributes: ['id', 'answer'],
                    required: true
                }, {
                    model: UserAnswer,
                    attributes: ['id'],
                    required: false,
                    where: {
                        questionGameId,
                        userId: req.user.id
                    }
                }],
                where: { id: questionGameId }
            })).toJSON()
            validateCheck(questionData.userAnswers.length, 'Ответ был дан ранее!')

            //Проверяет, что пользователь отвечает на следующий вопрос
            if (typeGame === 'carousel') {
                const isCreateAnswer = await UserAnswer.count({
                    includes: [{
                        model: QuestionGame,
                        attributes: [],
                        required: false,
                        where: {
                            gameId: req.params.id
                        }
                    }],
                    where: {
                        userId: req.user.id,
                    }
                })
                if (isCreateAnswer !== questionData.numberQuestion - 1) {
                    throw new Error('Нельзя ответить на вопрос не после предыдущего!')
                }
            }

            let isCorrect
            const { answer } = questionData.question
            isCorrect = answer === userAnswer ? true : false
            const userAnswerData = await UserAnswer.create({ questionGameId, userId: req.user.id, points, userAnswer, isCorrect })

            //Начисление бонуса, если выполнены условия
            if (isCorrect && typeGame === 'square') {
                const row = Math.ceil(questionData.numberQuestion / 5)
                const column = (questionData.numberQuestion - 1) % 5 + 1
                const bonusData = await Bonus.findOne({
                    where: {
                        userId: req.user.id,
                        gameId: req.params.id,
                        lvl: [row, column],
                        type: ['row', 'column'],
                    }
                })
                if (!bonusData || !bonusData[0] || !bonusData[1]) {
                    const checks = await Promise.all([
                        this.check(req, '("questionGame"."numberQuestion" - 1) / 5 + 1'),
                        this.check(req, '("questionGame"."numberQuestion" - 1) % 5 + 1')
                    ])
                    if (checks[0].includes(row)) {
                        await Bonus.create({ points: BONUS['column'][`${row}`], type: 'row', lvl: row, userId: req.user.id, gameId: req.params.id })
                    }
                    if (checks[1].includes(column)) {
                        await Bonus.create({ points: BONUS['column'][`${column}`], type: 'column', lvl: column, userId: req.user.id, gameId: req.params.id })
                    }
                }
            }

            res.json({ message: 'Ответ добавлен', isCorrect })
        } catch (error) {
            return next(ApiError.badRequest(`${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const gamesData = await UserAnswer.findAll({
                attributes: { exclude: ['gameId', 'userId', 'questionGameId'] },
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] },
                    required: false
                },
                {
                    model: QuestionGame,
                    attributes: ['id'],
                    required: false,
                    include: [{
                        model: Game,
                        attributes: ['id', 'typeGame', 'name'],
                        required: false
                    }]
                }]
            })
            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id ответа пользователя!')
            const isDelete = await UserAnswer.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Ответ пользователя не найден!')
            res.json({ message: 'Ответ пользователя удален' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async download(req, res, next) {
        try {
            const { countQuestion, rating } = await ratingController.getRatingPrivate(req.params.id, req.query.userId)
            let { typeGame, name, startDate, endDate } = await Game.findByPk(req.params.id, { attributes: ["typeGame", "name", "startDate", "endDate"] })

            startDate.setHours(startDate.getHours() + 3)
            endDate.setHours(endDate.getHours() + 3)
            startDate = startDate.toISOString().slice(0, 19).replace(/:/g, '-')
            endDate = endDate.toISOString().slice(0, 19).replace(/:/g, '-')

            // Имя файла
            const fileName = `${startDate}_${endDate}_${name}_${typeGame}.xlsx`

            // Создание массива данных для Excel
            let excelData = []

            // Строка с номерами вопросов
            let questionNumbers = ['Номер']
            for (let i = 1; i <= countQuestion; i++) {
                questionNumbers.push(i) // Номера вопросов
            }

            // Формирование данных ответов пользователя
            rating.forEach(item => {
                excelData.push(["Пользователь", item.username])
                excelData.push(questionNumbers)

                let answerPoints = ["Баллы"]
                // Перебираем все вопросы
                for (let i = 1; i <= countQuestion; i++) {
                    // Ищем ответ пользователя на данный вопрос
                    let userAnswer = item.userAnswers.find(answer => answer.numberQuestion === i)
                    if (userAnswer?.isCorrect) {
                        // Lобавляем баллы за верный ответ
                        answerPoints.push(userAnswer.points)
                    } else {
                        // Если ответа нет или неверный, ставим 0
                        answerPoints.push(0)
                    }
                }
                //TODO: заменить 0 на баллы
                excelData.push(answerPoints)
                if (typeGame === "square") {
                    excelData.push(["Сумма баллов за вопросы", 0])
                    excelData.push(["Бонусы", 0])
                }
                excelData.push(["Всего баллов", item.totalPoints])
                excelData.push([])
            });

            res.json({ fileName: fileName, excelData: excelData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка скачивания: ${error.message}`))
        }
    }

    async check(req, query) {
        const rows = await UserAnswer.findAll({
            attributes: [
                [Sequelize.literal(query), 'number'],
                [Sequelize.fn('COUNT', Sequelize.col('userAnswer.isCorrect')), 'correct_count']
            ],
            include: [{
                model: QuestionGame,
                attributes: [],
                where: {
                    gameId: req.params.id
                }
            }],
            where: {
                userId: req.user.id,
                isCorrect: true
            },
            group: [Sequelize.literal('number')],
            having: Sequelize.literal('COUNT("userAnswer"."isCorrect") = 5')
        });

        return rows.map(row => row.dataValues.number);
    }

    /*     async checkColumns(req) {
            const columns = await UserAnswer.findAll({
                attributes: [
                    [Sequelize.literal(), 'column_number'],
                    [Sequelize.fn('COUNT', Sequelize.col('userAnswer.isCorrect')), 'correct_count']
                ],
                include: [{
                    model: QuestionGame,
                    attributes: [],
                    where: {
                        gameId: req.params.id
                    }
                }],
                where: {
                    userId: req.user.id,
                    isCorrect: true
                },
                group: [Sequelize.literal('column_number')],
                having: Sequelize.literal('COUNT("userAnswer"."isCorrect") = 5')
            });
    
            return columns.map(column => column.dataValues.column_number);
        } */
}

module.exports = new userAnswerController()