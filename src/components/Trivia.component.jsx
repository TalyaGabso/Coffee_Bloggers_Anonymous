import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questions from './Questions.component';
// import GameSettings from './GameSetting.component';

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const getString = (string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = string;
    return textArea.value;
  };

  const getQuestions = async () => {
    const response = await axios.get("https://opentdb.com/api.php?amount=10&type=multiple")

    const result = response.data.results.map((questionData, index) => {
      const correctAnswer = getString(questionData.correct_answer)
      const options = [correctAnswer, ...questionData.incorrect_answers.map(opt => getString(opt))]
      return {
        id: index + 1,
        question: getString(questionData.question),
        correctAnswer: correctAnswer,
        options: options,
      };
    });

    setQuestions(result);
    console.log("result: ", result);
  }

  useEffect(() => {
    getQuestions()
  }, [])

  const handleAnswer = (target) => {
    //prevent click event

    //IF Corect: calculate score based on answer time.
    // target.value === questions[currentIndex].correctAnswer ? setScore(score + 1) : console.log('Nope!')
    if (target.value === questions[currentIndex].correctAnswer) {
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
    questions.length > 0 ? (
      currentIndex >= questions.length ? (
        <div>your score is {score} </div>
      ) : (
        <div>
          <Questions data={questions[currentIndex]} handleAnswer={handleAnswer} getNextQuestion={getNextQuestion}/>
          <div>{score}</div>
        </div>
      )
    ) : (
      <h3>Loading</h3>
    )
  )
}
export default Trivia;

