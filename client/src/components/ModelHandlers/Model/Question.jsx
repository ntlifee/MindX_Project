import './model.scss';
import { useState, useEffect } from 'react';
import { API } from '../../../http/API';
import { ErrorEmmiter, SuccessEmmiter } from './../../../components/Toastify/Notify.jsx';

const Question = (props) => { 
  const { model, setSelected} = props;

  const [question, setQuestion] = useState(model.question ? model.question : '');
  const [answer, setAnswer] = useState(model.answer ? model.answer : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    model.question = question;
  }, [question])
  useEffect(() => {
    model.answer = answer;
  }, [answer])

  const send = async () => {
    try {
      const data = await API.question.update(model);
      SuccessEmmiter(data.message);
      setSelected(null);
    } catch(error) {     
      ErrorEmmiter(error.response.data.message);
      console.error(error);
    }
  };
  return (    
    <div className="model-section">
      {model.mode === 'edit' ? 
        <>
          <div className='btn-container'>
            <button className='btn success' onClick={() => send()}>Сохранить</button>
            <button className='btn cancel' onClick={() => setSelected(null)}>Отменить</button>
          </div>
        </>
        :
        <>
        </>
      }
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Текст вопроса..."
          value={question} onChange={(e) => setQuestion(e.target.value)}/>      
        <input type="text" placeholder="Текст ответа..."
          value={answer} onChange={(e) => setAnswer(e.target.value)}/>
        {/* <input type="file" placeholder="Загрузить изображение"
          value={image} onChange={(e) => setImage(e.target.value)}/> */}
      </form>
    </div>
  );
}
 
export default Question;