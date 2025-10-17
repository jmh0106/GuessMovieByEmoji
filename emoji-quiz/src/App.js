import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { questionsData } from './data/questions';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('main'); // main, game, result
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const startGame = (category) => {
    setQuestions(shuffle(questionsData[category]).slice(0, 10));
    setGameState('game');
  };

  const endGame = (finalScore) => {
    setScore(finalScore);
    setGameState('result');
  };

  const restartGame = () => {
    setGameState('main');
    setScore(0);
    setQuestions([]);
  };

  const renderScreen = () => {
    switch (gameState) {
      case 'game':
        return <GameScreen questions={questions} onEndGame={endGame} />;
      case 'result':
        return <ResultScreen score={score} total={questions.length} onRestart={restartGame} />;
      case 'main':
      default:
        return <MainScreen onStartGame={startGame} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;