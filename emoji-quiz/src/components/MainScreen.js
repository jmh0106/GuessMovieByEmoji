import React from 'react';
import CurvedLoop from './CurvedLoop';

const MainScreen = ({ onStartGame, t }) => {

  return (
    <div className="container">
      {/* curveAmount 값을 0이 아닌 값으로 설정하여 굴곡을 다시 만듭니다.
        이제 굴곡이 있으므로 CurvedLoop 컴포넌트 내부 로직에 따라 드래그는 자동으로 비활성화됩니다.
      */}
      <CurvedLoop marqueeText={t.quizTitle} curveAmount={-300} />
      
      <div className="category-container">
        <button className="button category-button" onClick={() => onStartGame('movies')}>{t.categoryMovies}</button>
        <button className="button category-button" onClick={() => onStartGame('animation')}>{t.categoryAnimation}</button>
        <button className="button category-button" onClick={() => onStartGame('books')}>{t.categoryBooks}</button>
      </div>
    </div>
  );
};

export default MainScreen;