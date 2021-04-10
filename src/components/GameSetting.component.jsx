import React, { useState, useEffect } from 'react';
import Trivia from './Trivia.component';
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
    console.log("response_code: ", response.data.response_code);
    const result = response.data.results.map((questionData, index) => {
      const correctAnswer = getString(questionData.correct_answer)
      const options = [correctAnswer, ...questionData.incorrect_answers.map(opt => getString(opt))]
      return {
        id: index + 1,
        category: questionData.category,
        difficulty: questionData.difficulty,
        question: getString(questionData.question),
        correctAnswer: correctAnswer,
        options: options,
      };
    });
    setTriviaData(result);
  };


  const getCategoriesList = async () => {
    const response = await axios.get("https://opentdb.com/api_category.php")
    const result = response.data.trivia_categories
    setCategoriesList(result)
  };

  useEffect(() => {
    getCategoriesList();
    console.log("trivia data: ", triviaData);
  }, [triviaData])

  const handleSubmit = (e) => {
    e.preventDefault();
    !(triviaData.length) && (category) && (difficulty) ? getTriviaData() : console.log("didnt work");
  };

  const handleSelectedSettings = (currentTarget) => {
    const eventValue = currentTarget.value;
    if (currentTarget.id === "category") {
      setCategory(eventValue);
    }
    else if (currentTarget.id === "difficulty") {
      setDifficulty(eventValue);
    };
  };
  
  return (
    <div className="card-container">
      {categoriesList.length > 0 ?
        <div>
          {triviaData.length > 0 ?
            <Trivia triviaData={triviaData} /> :
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <select id="category" onChange={(e) => handleSelectedSettings(e.currentTarget)}>
                  <option defaultValue> Select Category </option>
                  {categoriesList.map(category => <option value={category.id} key={category.id}>{category.name}</option>)};
        </select>
              </div>
              <div>
                <select id="difficulty" onChange={(e) => handleSelectedSettings(e.currentTarget)}>
                  <option defaultValue> Select Difficulty </option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div><input type="submit" value="Start Game" /></div>
            </form>
          }
        </div>
        : <div>LOADING...</div>}
    </div>
  );
};
export default GameSettings;