import React, { useEffect, useRef } from 'react';

const ResultScreen = ({ score, total, onRestart, t }) => {
  const restartButtonRef = useRef(null);

  useEffect(() => {
    restartButtonRef.current?.focus();
  }, []);

  return (
    <div className="container result-container" style={{ display: 'flex', opacity: 1 }}>
      <div className="result-text">
        {t.resultTitle}
        <br />
        {t.resultScore(score, total)}
      </div>
      <button ref={restartButtonRef} className="button restart-button" onClick={onRestart}>
        {t.restartButton}
      </button>
    </div>
  );
};

export default ResultScreen;