import './model.scss';
import React, { useState, useEffect, useMemo } from 'react';
import CatalogRef from '@mindx/components/UI/CatalogRef/CatalogRef';
import MXSelect from '@mindx/components/UI/MXSelect/MXSelect';
import MXDatetime from '@mindx/components/UI/MXDatetime/MXDatetime';
import moment from 'moment';

const Game = (props) => {
  const { model } = props;
  
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
  const pages = {
    square: 6,
    carousel: 3
  };

  const [typeGame, setTypeGame] = useState(model?.typeGame ? model.typeGame : '');
  const [name, setName] = useState(model?.name ? model.name : '');
  const [startDate, setStartDate] = useState(model?.startDate ? moment(model.startDate) : null);
  const [endDate, setEndDate] = useState(model?.endDate ? moment(model.endDate) : null);
  const [imageId, setImageId] = useState(null);
  const [accessGames, setAccessGames] = useState([]);
  const [page, setPage] = useState(1);
  const [themeGames, setThemes] = useState(model?.themeGames ? model.themeGames : []);
  const [questionGames, setQuestions] = useState(model?.questionGames ? model.questionGames : []);
  
  const totalPages = useMemo(() => {
    return pages[typeGame] || 1;
  }, [typeGame])


  const handleThemeChange = (themeIndex, selectedTheme) => {
    setThemes((prevThemes) => {
      const newThemes = [...prevThemes];
      newThemes[themeIndex] = selectedTheme;
      return newThemes;
    });
  };

  const handleQuestionChange = (themeIndex, questionIndex, selectedQuestion) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      if (!newQuestions[themeIndex]) {
        newQuestions[themeIndex] = [];
      }
      newQuestions[themeIndex][questionIndex] = selectedQuestion;
      return newQuestions;
    });
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
    model.accessGames = accessGames;
  }, [accessGames]);

  useEffect(() => {
    model.themeGames = themeGames;
  }, [themeGames]);

  useEffect(() => {
    model.questionGames = questionGames;
  }, [questionGames]);

  const nextPage = () => {
    if (page < totalPages) {
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
                onChange={setAccessGames}
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
            {[1, 2, 3, 4, 5].map((item, themeIndex) => (
              <React.Fragment key={item + 311}>
                {page === item + 1 && (
                  <div className="group-label">
                    <label>{`Тема №${item}`}</label>
                    <CatalogRef
                      defaultValue={themeGames[themeIndex] || null}
                      onChange={(selectedTheme) => handleThemeChange(themeIndex, selectedTheme)}
                      url={"theme"}
                      path={"name"}
                      placeholder={`Выберите тему №${item}...`}
                    />
                  </div>
                )}
                {page === item + 1 &&
                  [1, 2, 3, 4, 5].map((question, questionIndex) => (
                    <div className="group-label">
                        <label>{`Вопрос LVL ${question}`}</label>
                        <CatalogRef
                          defaultValue={questionGames[themeIndex]?.[questionIndex] || null}
                          onChange={(selectedQuestion) =>
                            handleQuestionChange(themeIndex, questionIndex, selectedQuestion)
                          }
                          url={"question"}
                          path={"question"}
                          placeholder={`Выберите вопрос LVL ${question}`}
                        />
                      </div>
                  ))}
              </React.Fragment>
            ))}
          </>
        )}
        <div className="button-group">
          <button className={page === 1 ? 'visible_false' : ''} hidden type="button" onClick={() => prevPage()}>
            Назад
          </button>
          <label>{page}/{totalPages}</label>
          <button className={page === totalPages ? 'visible_false' : ''} type="button" onClick={() => nextPage()}>
            Далее
          </button>
        </div>
      </form>
    </div>
  );
};

export default Game;