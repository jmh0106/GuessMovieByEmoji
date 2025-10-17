import React from 'react';

const MainScreen = ({ onStartGame }) => {
  return (
    <div className="container">
      <h1 className="title">이모지 퀴즈</h1>
      <div className="category-container">
        <button className="button category-button" onClick={() => onStartGame('movies')}>🎬 영화</button>
        <button className="button category-button" onClick={() => onStartGame('animation')}>👾 애니메이션</button>
        <button className="button category-button" onClick={() => onStartGame('books')}>📚 책</button>
      </div>
    </div>
  );
};

export default MainScreen;