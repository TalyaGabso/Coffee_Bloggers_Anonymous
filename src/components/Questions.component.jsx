import React from 'react';

const Questions = ({ getNextQuestion,handleAnswer, data: { id,question,correctAnswer,options }}) => {
  const shuffle = (answersArray) => {
    for (let i = answersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = answersArray[i]
      answersArray[i] = answersArray[j]
      answersArray[j] = temp
    };
    return answersArray;
  };
  shuffle(options);

  return (
    <div>
      <h3>{question}</h3>
      {options.map((option,index) => <input type="button" value={option} onClick={(e) => {handleAnswer(e.target); getNextQuestion()}} key={index+1}/>)}
    </div>
  );
};
export default Questions