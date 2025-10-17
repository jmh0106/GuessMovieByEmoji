import React from 'react';

const ResultScreen = ({ score, total, onRestart }) => {
  return (
    <div className="container result-container" style={{ display: 'flex', opacity: 1 }}>
      <div className="result-text">
        게임 종료!
        <br />
        {total} 문제 중 {score}개 맞췄어요!
      </div>
      <button className="button restart-button" onClick={onRestart}>처음으로</button>
    </div>
  );
};

export default ResultScreen;