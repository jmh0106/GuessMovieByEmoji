import React, { useState, useEffect, useRef, useCallback } from 'react';

const GameScreen = ({ questions, onEndGame, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const inputRef = useRef(null);
  const nextButtonRef = useRef(null);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

  const handleCheckAnswer = useCallback(() => {
    if (isAnswered || userAnswer.trim() === '') return;
    const isCorrect = normalize(userAnswer) === normalize(questions[currentIndex].answer);
    if (isCorrect) {
      setFeedback(t.correctFeedback);
      setScore(prev => prev + 1);
    } else {
      setFeedback(t.incorrectFeedback);
    }
    setIsAnswered(true);
  }, [isAnswered, userAnswer, currentIndex, questions, t]);

  const handleNextQuestion = useCallback(() => {
    if (!isAnswered) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setIsAnswered(false);
      setUserAnswer('');
      setFeedback('');
    } else {
      onEndGame(score);
    }
  }, [isAnswered, currentIndex, questions.length, score, onEndGame]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (isAnswered) {
          handleNextQuestion();
        } else {
          handleCheckAnswer();
        }
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isAnswered, handleCheckAnswer, handleNextQuestion]);

  useEffect(() => {
    if (isAnswered) {
      setTimeout(() => nextButtonRef.current?.focus(), 0);
    } else {
      inputRef.current?.focus();
    }
  }, [isAnswered, currentIndex]);

  return (
    <div className="container game-screen" style={{ display: 'flex', opacity: 1 }}>
      <div className="status">{t.statusLabel} {currentIndex + 1} / {questions.length}</div>
      <div className="emoji-box">{questions[currentIndex].emoji}</div>
      <div className="feedback" style={{ color: feedback === t.correctFeedback ? '#28a745' : '#dc3545' }}>
        {feedback}
      </div>
      {!isAnswered ? (
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            className="input-box"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={t.inputPlaceholder}
          />
          <button className="button confirm-button" onClick={handleCheckAnswer}>{t.confirmButton}</button>
        </div>
      ) : (
        <div className="answer-container">
          <div className="answer-text">{t.answerLabel}: {questions[currentIndex].answer}</div>
          <button ref={nextButtonRef} className="button next-button" onClick={handleNextQuestion}>{t.nextButton}</button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;