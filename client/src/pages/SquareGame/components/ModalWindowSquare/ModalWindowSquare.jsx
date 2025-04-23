import classes from './modalWindowSquare.module.css';
import { useState } from 'react';
import { API } from '@mindx/http/API';
import { ErrorEmmiter } from '@mindx/components/UI/Toastify/Notify';
import { Image } from 'react-bootstrap';
import { mindxDebounce } from '@mindx/utils/tools'

const ModalWindowSquare = (props) => {
	const {
		setCurrentQuestion,
		currentQuestion,
		currentTheme,
		score,
		setScore,
		gameId,
		questions,
		setQuestions,
	} = props;

	const scoreQuestion = (((currentQuestion.numberQuestion - 1) % 5) + 1) * 10;
	const [answer, setAnswer] = useState('');
	const level =
		currentQuestion.numberQuestion % 5 === 0
			? 5
			: currentQuestion.numberQuestion % 5;

	const postAnswer = (body) => {
		API.game
			.postAnswer({ gameId, body })
			.then(({ isCorrect }) => {
				questions[currentTheme - 1][level - 1].userAnswer = {
					isCorrect,
					userAnswer: body.userAnswer,
				};
				setQuestions([...questions]);
				ChangeScore(isCorrect ? 1 : 0);
			})
			.catch((error) => {
				const errorsArray = error.response.data.errors;
				errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
				console.error(error);
			});
	};

	const handleAnswer = mindxDebounce(() => {
		if (!currentQuestion.userAnswer && answer) {
			const body = {
				questionGameId: currentQuestion.id,
				userAnswer: answer,
				points: level * 10,
			};
			postAnswer(body);
			setCurrentQuestion(null);
		} else {
			ErrorEmmiter('Поле ответа не может быть пустым!');
		}
	});

	const ChangeScore = (koef) => {
		setScore(score + scoreQuestion * koef);
	};

	return (
		<div className={classes.modal_dark}>
			<div className={classes.modal_window_square}>
				<button
					className={classes.close_button}
					onClick={() => setCurrentQuestion(null)}
				>
					&times;
				</button>
				<div className={classes.content_question}>
					{currentQuestion.question.imageId && (
						<Image
							src={`http://localhost:3001/${currentQuestion.question.imageId}.jpg`}
						/>
					)}
					{currentQuestion.question.question}
				</div>
				<div className={classes.content_answer}>
					{!currentQuestion.userAnswer ? (
						<textarea
							placeholder='Введите ответ:'
							className={classes.text_answer}
							onChange={(e) => setAnswer(e.target.value)}
						/>
					) : (
						<textarea
							readOnly
							className={classes.text_answer}
						>
							{currentQuestion.userAnswer.userAnswer ||
								'(Вы ничего не ответили.)'}
						</textarea>
					)}
					<div className={classes.content_buttons}>
						{!currentQuestion.userAnswer ? (
							<>
								<button
									className={`${classes.button} ${classes.green}`}
									onClick={() => handleAnswer()}
								>
									Ответить
								</button>
							</>
						) : (
							<button
								className={`${classes.button} ${classes.red}`}
								onClick={() => setCurrentQuestion(null)}
							>
								Закрыть
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalWindowSquare;
