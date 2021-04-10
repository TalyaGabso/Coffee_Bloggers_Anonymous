import React from 'react';

const Questions = ({ getNextQuestion,handleAnswer,showCorrectAnswer, data: { id,question,correctAnswer,options }}) => {
  console.log(correctAnswer);
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
      <h3>{id}) {question}</h3>
      {options.map((option,index) => <input type="button" value={option} onClick={(e) => {handleAnswer(e.target); getNextQuestion()}} key={index+1} style={{backgroundColor:{showCorrectAnswer}}}/>)}
    </div>
  );
};
export default Questions