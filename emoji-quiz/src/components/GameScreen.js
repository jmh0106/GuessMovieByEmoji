import React, { useState, useEffect, useRef } from 'react';

const GameScreen = ({ questions, onEndGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const inputRef = useRef(null);
  const nextButtonRef = useRef(null);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

  // '정답 확인' 함수
  const handleCheckAnswer = () => {
    if (isAnswered || userAnswer.trim() === '') return;

    const isCorrect = normalize(userAnswer) === normalize(questions[currentIndex].answer);

    if (isCorrect) {
      setFeedback('정답입니다!');
      setScore(prev => prev + 1);
    } else {
      setFeedback('틀렸습니다!');
    }
    setIsAnswered(true);
  };

  // '다음 문제' 함수
  const handleNextQuestion = () => {
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
  };

  // ### BUG FIX: 가장 안정적인 이벤트 처리 방식 ###

  // 1. '입력창'을 위한 엔터 키 핸들러
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 이벤트 전파를 막아 다른 요소에 영향을 주지 않도록 합니다.
      e.preventDefault(); 
      handleCheckAnswer();
    }
  };

  // 2. 화면 상태가 바뀔 때마다 포커스를 자동으로 이동
  useEffect(() => {
    if (isAnswered) {
      // 답변 후에는 '다음 문제' 버튼으로 포커스
      // setTimeout을 사용하여 브라우저가 렌더링을 완료할 시간을 줍니다.
      setTimeout(() => nextButtonRef.current?.focus(), 0);
    } else {
      // 새 문제가 나오면 '입력창'으로 포커스
      inputRef.current?.focus();
    }
  }, [isAnswered, currentIndex]);

  return (
    <div className="container game-screen" style={{ display: 'flex', opacity: 1 }}>
      <div className="status">문제 {currentIndex + 1} / {questions.length}</div>
      <div className="emoji-box">{questions[currentIndex].emoji}</div>
      <div className="feedback" style={{ color: feedback.includes('정답') ? '#28a745' : '#dc3545' }}>
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
            onKeyDown={handleInputKeyDown} // 입력창 전용 핸들러 사용
            placeholder="정답을 입력하세요"
          />
          <button className="button confirm-button" onClick={handleCheckAnswer}>정답 확인</button>
        </div>
      ) : (
        <div className="answer-container">
          <div className="answer-text">정답: {questions[currentIndex].answer}</div>
          <button 
            ref={nextButtonRef} 
            className="button next-button" 
            onClick={handleNextQuestion}
          >
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;