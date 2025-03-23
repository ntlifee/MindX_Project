import './carouselgame.scss';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import GameInformationPanel from '@mindx/components/GameInformationPanel/GameInformationPanel';
import { API } from '@mindx/http/API';
import { ErrorEmmiter } from '@mindx/components/UI/Toastify/Notify';
import { mindxDebounce } from '@mindx/utils/tools';

const CarouselGame = () => {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [carouselData, setCarouselData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [lastQuestion, setLastQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');

  const questionsListRef = useRef(null);

  useEffect(() => {
    API.game
      .getByIdUser(id)
      .then((response) => {
        setQuestions(response.questionGames);
        setEndDate(response.endDate);
        setCarouselData(response.carouselData);
      })
      .catch((error) => {
        const errorsArray = error.response.data.errors;
        errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    const lastIndex = questions.findIndex((item) => item.userAnswer === null);
    setLastQuestion(questions[lastIndex]);
    setCurrentQuestionIndex(lastIndex);
    setUserAnswer('');
  }, [questions]);

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (questionsListRef.current && currentQuestionIndex !== null) {
      const questionElement = questionsListRef.current.children[currentQuestionIndex];
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentQuestionIndex]);

  const handleSphereClick = (index) => {
    setCurrentQuestionIndex(index);
    setUserAnswer('');
  };

  const scrollQuestions = (direction) => {
    if (questionsListRef.current) {
      const scrollAmount = 100;
      if (direction === 'left') {
        questionsListRef.current.scrollLeft -= scrollAmount;
      } else {
        questionsListRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const postAnswer = mindxDebounce(() => {
    if (userAnswer) {
      let possibleScore = null;
      const prevAnswer = questions[currentQuestionIndex - 1]?.userAnswer;
      if (lastQuestion.numberQuestion === 1 ) {
        possibleScore = carouselData.scoreFirst;
      } else if (prevAnswer.isCorrect) {
        possibleScore = prevAnswer?.points + carouselData.scoreSuccess;
      } else {
        possibleScore = prevAnswer?.points - carouselData.scoreFailure < carouselData.scoreFirst
          ? carouselData.scoreFirst
          : prevAnswer?.points - carouselData.scoreFailure
      }
      const body = {
        questionGameId: lastQuestion.id,
        userAnswer: userAnswer,
        points: possibleScore,
      };
      const gameId = id;
      API.game
        .postAnswer({ gameId, body })
        .then(({ isCorrect }) => {
          questions[currentQuestionIndex].userAnswer = {
            isCorrect,
            userAnswer: body.userAnswer,
            points: possibleScore,
          };
          setQuestions([...questions]);
        })
        .catch((error) => {
          const errorsArray = error.response.data.errors;
          errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
          console.error(error);
        });
    }
  });

  return (
    <main className="carousel-section">
      <div className="carousel-wrapper">
      <GameInformationPanel endDate={endDate}/>
        <div className="carousel">
          <div className="questions__container">
            <button className="scroll-button left" onClick={() => scrollQuestions('left')}>
              &lt;
            </button>
            <div className="questions__list" ref={questionsListRef}>
              {questions.map((item, index) => (
                <div key={index} className="sphere-container">
                  <button
                    disabled={index > lastQuestion?.numberQuestion - 1}
                    className={`sphere 
                      ${index === currentQuestionIndex ? 'active' : ''}
                      ${item?.userAnswer?.isCorrect === true && 'correct'}
                      ${item?.userAnswer?.isCorrect === false && 'incorrect'}`}
                    onClick={() => handleSphereClick(index)}
                  >
                    {index + 1}
                  </button>
                  {item?.userAnswer && (
                    <div className="points">
                      {item?.userAnswer?.isCorrect ? `+${item.userAnswer.points}` : '+0'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scrollQuestions('right')}>
              &gt;
            </button>
          </div>
          <div className="carousel__item">
            <div className="carousel_item-head">№{currentQuestionIndex + 1}</div>
            <div className="carousel_item-body">
              {questions[currentQuestionIndex]?.question.question}
            </div>
            <div className="answer-section">
            <input
              type="text"
              readOnly={currentQuestion?.id !== lastQuestion?.id}
              value={
                currentQuestion?.id !== lastQuestion?.id
                  ? currentQuestion?.userAnswer?.userAnswer || ''
                  : userAnswer
              }
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Введите ваш ответ"
              className="answer-input"
            />
            {
              currentQuestion?.id !== lastQuestion?.id
              ?
              <button className="red-button" onClick={() => {}}>
                Вернуться к текущему вопросу
              </button>
                :
                <button className="submit-button" onClick={() => postAnswer()}>
                Ответить
              </button>
            }
          </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CarouselGame;