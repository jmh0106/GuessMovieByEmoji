import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { questionsData } from './data/questions';
import { locales } from './data/locales'; // 언어 파일 import
import './App.css';

function App() {
  const [gameState, setGameState] = useState('main'); // main, game, result
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [locale, setLocale] = useState('ko'); // 언어 상태 추가 (기본값: 한국어)

  const t = locales[locale]; // 현재 언어에 맞는 텍스트 객체

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const startGame = (category) => {
    const rawQuestions = shuffle(questionsData[category]).slice(0, 10);
    // 질문의 정답을 현재 언어에 맞게 변환
    const localizedQuestions = rawQuestions.map(q => ({
        ...q,
        answer: t[q.answerKey]
    }));
    setQuestions(localizedQuestions);
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
        return <GameScreen questions={questions} onEndGame={endGame} t={t} />;
      case 'result':
        return <ResultScreen score={score} total={questions.length} onRestart={restartGame} t={t} />;
      case 'main':
      default:
        return <MainScreen onStartGame={startGame} t={t} />;
    }
  };

  return (
    <div className="App">
      <div className="language-switcher">
        <button 
          className={`lang-button ${locale === 'ko' ? 'active' : ''}`} 
          onClick={() => setLocale('ko')}>
          KO
        </button>
        <button 
          className={`lang-button ${locale === 'en' ? 'active' : ''}`} 
          onClick={() => setLocale('en')}>
          EN
        </button>
      </div>
      {renderScreen()}
    </div>
  );
}

export default App;