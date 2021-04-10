import React, { useState } from 'react';
import Questions from './Questions.component';
import Timer from './Timer.component'
import Result from './Result.component'


const Trivia = ({ triviaData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timerOn, setTimerOn] = useState(true);

  const handleAnswer = (target) => {
    //IF Corect: calculate score based on answer time.
    setTimerOn(false);
    if (target.value === triviaData[currentIndex].correctAnswer) {
      setScore(score + 1);
    };
    //Correct Answer: highlight answer in green 

    //Wrong Answer: highligh answer in red + correct answer in green

  };

  //get next answer after 2 sec
  const getNextQuestion = () => {
    const nextIndex = currentIndex + 1
    setTimeout(() => {
      //next question
      setCurrentIndex(nextIndex);
      setTimerOn(true);
    }, 1000)
  }
  return (
    <div className="card-container">
      {currentIndex >= triviaData.length ? (
        <Result score={score} triviaData={triviaData}/>
      ) : (
        <div>
          <div>{currentIndex + 1}/{triviaData.length}</div>
          <Timer timerOn={timerOn}/>
          <Questions data={triviaData[currentIndex]} handleAnswer={handleAnswer} getNextQuestion={getNextQuestion} />
        </div>
      )}
    </div>
  )
}
export default Trivia;

