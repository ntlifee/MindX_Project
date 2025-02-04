import './model.scss';
import { useState, useEffect } from 'react';
import { API } from '@mindx/http/API';
import { ErrorEmmiter, SuccessEmmiter } from '@mindx/components/UI/Toastify/Notify';

const Question = (props) => { 
  const { model } = props;

  const [question, setQuestion] = useState(model?.question ? model.question : '');
  const [answer, setAnswer] = useState(model?.answer ? model.answer : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    model.question = question;
  }, [question])
  useEffect(() => {
    model.answer = answer;
  }, [answer])
  
  return (    
    <div className="model-section">
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