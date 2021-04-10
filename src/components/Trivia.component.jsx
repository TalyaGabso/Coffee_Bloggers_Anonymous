import React, { useState} from 'react';
import Questions from './Questions.component';
// import axios from 'axios';
// import GameSettings from './GameSetting.component';

const Trivia = ({triviaData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (target) => {
    //prevent click event

    //IF Corect: calculate score based on answer time.
    // target.value === questions[currentIndex].correctAnswer ? setScore(score + 1) : console.log('Nope!')
    if (target.value === triviaData[currentIndex].correctAnswer) {
      setScore(score + 1)
    };
    //Correct Answer: highlight answer in green 

    //Wrong Answer: highligh answer in red + correct answer in green


  };

  //get next answer after 2 sec
  const getNextQuestion = () => {
    const nextIndex = currentIndex + 1
    setTimeout(() => {
      //next question
      setCurrentIndex(nextIndex)
    }, 500)
  }
  return (
    
    currentIndex >= triviaData.length ? (
      <div>your score is {score} </div>
    ) : (
      <div>
        <div>{currentIndex+1}/{triviaData.length}</div>
        <Questions data={triviaData[currentIndex]} handleAnswer={handleAnswer} getNextQuestion={getNextQuestion} />
        <div>Score: {score}</div>
      </div>
    )
  )
}
export default Trivia;

