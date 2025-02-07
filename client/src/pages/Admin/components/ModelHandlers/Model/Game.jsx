import './model.scss';
import React, { useState, useEffect } from 'react';
import CatalogRef from '@mindx/components/UI/CatalogRef/CatalogRef';
import MXSelect from '@mindx/components/UI/MXSelect/MXSelect';
import MXDatetime from '@mindx/components/UI/MXDatetime/MXDatetime';
import moment from 'moment';

const Game = (props) => {
  const { model } = props;

  const [typeGame, setTypeGame] = useState(model?.typeGame ? model.typeGame : '');
  const [name, setName] = useState(model?.name ? model.name : '');
  const [startDate, setStartDate] = useState(model?.startDate ? moment(model.startDate) : null);
  const [endDate, setEndDate] = useState(model?.endDate ? moment(model.endDate) : null);
  const [imageId, setImageId] = useState(null);
  const [accessRole, setAccessRole] = useState([]);
  const [page, setPage] = useState(1);
  const [themes, setThemes] = useState({});
  const [questions, setQuestions] = useState({});
  const [timers, setTimers] = useState({});

  const TYPE_LIST = [
    {
      value: 'square',
      label: 'Квадрат'
    },
    {
      value: 'carousel',
      label: 'Карусель'
    }
  ];

  const handleThemeChange = (themeId, selectedTheme) => {
    setThemes((prevThemes) => ({
      ...prevThemes,
      [themeId]: selectedTheme,
    }));
  };

  const handleQuestionChange = (themeId, questionId, selectedQuestion) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [themeId]: {
        ...prevQuestions[themeId],
        [questionId]: selectedQuestion,
      },
    }));
  };

  const handleTimerChange = (themeId, questionId, timerValue) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [themeId]: {
        ...prevTimers[themeId],
        [questionId]: timerValue,
      },
    }));
  };

  useEffect(() => {
    model.typeGame = typeGame;
  }, [typeGame]);
  useEffect(() => {
    model.name = name;
  }, [name]);
  useEffect(() => {
    model.startDate = startDate;
  }, [startDate]);
  useEffect(() => {
    model.endDate = endDate;
  }, [endDate]);
  useEffect(() => {
    model.imageId = imageId;
  }, [imageId]);
  useEffect(() => {
    model.accessRole = accessRole;
  }, [accessRole]);
  useEffect(() => {
    model.themes = themes;
  }, [themes]);
  useEffect(() => {
    model.questions = questions;
  }, [questions]);
  useEffect(() => {
    model.timers = timers;
  }, [timers]);

  const nextPage = () => {
    if (typeGame === 'square' && page < 6) {
      setPage(page + 1);
    } else if (typeGame === 'carousel' && page < 3){
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="model-section">
      <form onSubmit={(e) => e.preventDefault()}>
        {page === 1 && (
          <>
            <div className="group-label">
              <label>Тип</label>
              <MXSelect
                options={TYPE_LIST}
                onChange={setTypeGame}
                defaultValue={model?.typeGame ? model.typeGame : null}
                placeholder="Выберите тип..."
              />
            </div>
            <div className="group-label">
              <label>Название</label>
              <input
                type="text"
                placeholder="Название..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="group-label">
              <label>Дата начала</label>
              <MXDatetime
                initialValue={moment(model?.startDate ? moment(model.startDate) : null)}
                onChange={setStartDate}
              />
            </div>
            <div className="group-label">
              <label>Дата окончания</label>
              <MXDatetime
                initialValue={moment(model?.endDate ? moment(model.endDate) : null)}
                onChange={setEndDate}
              />
            </div>
            <div className="group-label">
              <label>Изображение</label>
              <CatalogRef
                defaultValue={model.imageId ? model.imageId : null}
                onChange={setImageId}
                url={"image"}
                img={true}
                placeholder="Выберите изображение..."
              />
            </div>
            <div className="group-label">
              <label>Доступно для ролей</label>
              <CatalogRef
                defaultValue={model.accessGames ? model.accessGames : null}
                onChange={setAccessRole}
                isMulti
                url={"role"}
                path={"name"}
                placeholder="Выберите роли..."
              />
            </div>
          </>
        )}
        {typeGame === 'square' && (
          <>
            {[2, 3, 4, 5, 6].map((item) => (
              <React.Fragment key={item}>
                {page === item && (
                  <div className="group-label">
                    <label>{`Тема №${item - 1}`}</label>
                    <CatalogRef
                      defaultValue={themes[item] || null}
                      onChange={(selectedTheme) => handleThemeChange(item - 1, selectedTheme)}
                      url={"theme"}
                      path={"name"}
                      placeholder={`Выберите тему №${item - 1}...`}
                    />
                  </div>
                )}
                {page === item &&
                  [1, 2, 3, 4, 5].map((question) => (
                    <div className='group-timer' key={`${item}-${question}`}>
                      <div className="group-label">
                        <label>{`Вопрос LVL ${question}`}</label>
                        <CatalogRef
                          defaultValue={questions[item - 1]?.[question] || null}
                          onChange={(selectedQuestion) =>
                            handleQuestionChange(item - 1, question, selectedQuestion)
                          }
                          url={"question"}
                          path={"question"}
                          placeholder={`Выберите вопрос LVL ${question}`}
                        />
                      </div>
                      <div className='group-label timer'>
                        <label>{'Таймер (сек)'}</label>
                        <input
                          type="number"
                          min={0}
                          value={timers[item - 1]?.[question] || ''} 
                          onChange={(e) =>
                            handleTimerChange(item - 1, question, parseInt(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </>
        )}
        <div className="button-group">
          <button type="button" onClick={() => prevPage()}>
            Назад
          </button>
          <label>{page}</label>
          <button type="button" onClick={() => nextPage()}>
            Далее
          </button>
        </div>
      </form>
    </div>
  );
};

export default Game;