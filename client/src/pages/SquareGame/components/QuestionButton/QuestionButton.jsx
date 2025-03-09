import classes from './questionButton.module.css';

const QuestionButton = (props) => {
	const { model, setCurrentQuestion, level, numberTheme, setCurrentTheme } = props;
	const handleClick = () => {
		setCurrentQuestion(model);
		setCurrentTheme(numberTheme);
	};
	return (
		<td className={classes.question_button_wrapper}>
			{!model.userAnswer ? (
				<a
					href='#'
					className={classes.question_button}
					onClick={() => handleClick()}
				>
					{level ? level * 10 : '?'}{' '}
				</a>
			) : model.userAnswer.isCorrect ? (
				<a
					href='#'
					className={`${classes.question_button} ${classes.green}`}
					onClick={() => handleClick()}
				>
					{level ? level * 10 : '?'} &#9989;
				</a>
			) : (
				<a
					href='#'
					className={`${classes.question_button} ${classes.red}`}
					onClick={() => handleClick()}
				>
					{level ? level * 10 : '?'} &#10060;
				</a>
			)}
		</td>
	);
};

export default QuestionButton;
