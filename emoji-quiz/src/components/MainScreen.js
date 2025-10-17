import React from 'react';

const MainScreen = ({ onStartGame, t }) => {

  return (
    <div className="container">
      <h1 className="title">{t.quizTitle}</h1>
      <div className="category-container">
        <button className="button category-button" onClick={() => onStartGame('movies')}>{t.categoryMovies}</button>
        <button className="button category-button" onClick={() => onStartGame('animation')}>{t.categoryAnimation}</button>
        <button className="button category-button" onClick={() => onStartGame('books')}>{t.categoryBooks}</button>
        {/* 새로운 카테고리를 여기에 추가하면 됩니다. */}
      </div>
    </div>
  );
};

export default MainScreen;