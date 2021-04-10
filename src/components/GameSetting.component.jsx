import React, { useState, useEffect, useRef } from 'react';
// import Trivia from './components/Trivia.component';

import axios from 'axios';

const GameSettings = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [triviaData, setTriviaData] = useState([]);

  const getString = (string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = string;
    return textArea.value;
  };

  const getTriviaData = async () => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
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
    console.log(result);

    setTriviaData(result);
    console.log("trivia data: ", triviaData);

  };


  const getCategoriesList = async () => {
    const response = await axios.get("https://opentdb.com/api_category.php")
    const result = response.data.trivia_categories
    setCategoriesList(result)
  };

  useEffect(() => {
    getCategoriesList();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", e);
    console.log("if sts ", !(triviaData.length) && (category) && (difficulty));
    !(triviaData.length) && (category) && (difficulty) ? getTriviaData() : console.log("didnt work");
  };
  const handleSelectedSettings = (e) => {
    const eventValue = e.target.value;
    console.log(eventValue);
    if (e.target.id === "category") {
      setCategory(eventValue);
      console.log("category", category);
    }
    else if (e.target.id === "difficulty") {
      setDifficulty(eventValue);
      console.log("difficulty", difficulty);
    };
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="category">Select Category:</label>
          <select id="category" onChange={handleSelectedSettings}>
            {categoriesList.map(category => <option value={category.id} key={category.id}>{category.name}</option>)};
        </select>
        </div>
        <div>
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select id="difficulty" onChange={handleSelectedSettings}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div><input type="submit" value="Start Game" /></div>
      </form>
    </div>
  );
};
export default GameSettings;