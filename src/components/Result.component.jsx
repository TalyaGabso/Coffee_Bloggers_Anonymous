import React from 'react';
import Timer from './Timer.component';

const Result = ({ score ,triviaData,time}) => {
console.log({score});
console.log({triviaData});
console.log('time: ', {time});

  return (
    <div>
      <p>You answered {score} questions correctly out of {triviaData.length} in a total of {<Timer/>}</p>
      <p> Category: {triviaData[0].category}</p>
      <p> Difficulty Level: {triviaData[0].difficulty}</p>
      <br/>
      <h3>Your Final Score is {score}</h3>
    </div>
  );
};
export default Result;