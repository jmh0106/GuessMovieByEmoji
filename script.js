document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultContainer = document.getElementById('result-container');
    const startButton = document.querySelector('.start-button');
    const restartButton = document.querySelector('.restart-button');
    const confirmButton = document.querySelector('.confirm-button');
    const nextButton = document.querySelector('.next-button');
    const answerInput = document.getElementById('answer-input');

    const allQuestions = [
        { emoji: '🚢🧊💔👫🎨', answer: '타이타닉' },
        { emoji: '🦸‍♂️🦸‍♀️🔨🛡️🕷️Infinity', answer: '어벤져스' },
        { emoji: '🧙‍♂️⚡️🚂🏰🐍', answer: '해리포터' },
        { emoji: '🧑‍🚀🌌🕰️👨‍👧📖', answer: '인터스텔라' },
        { emoji: '🦁👑🐗🦓🦒', answer: '라이온 킹' },
        { emoji: '❄️👸☃️🎶', answer: '겨울왕국' },
        { emoji: '🏠👨‍👩‍👧‍👦🍑 parasitic', answer: '기생충' },
        { emoji: '🤡🃏🧠💃🕺', answer: '조커' },
        { emoji: '🦖🏝️🚙琥珀', answer: '쥬라기 공원' },
        { emoji: '🔵🔴💊🥋🕶️', answer: '매트릭스' },
        { emoji: '🎹🎶💖🌃', answer: '라라랜드' },
        { emoji: '🍫🍤🏃‍♂️🇺🇸', answer: '포레스트 검프' },
        { emoji: '🦇🤵‍♂️💰💣', answer: '다크 나이트' },
        { emoji: '😴🌀🗼🤔', answer: '인셉션' },
        { emoji: '👽🚲🌕👆', answer: 'ET' },
        { emoji: '👻🏺 potter', answer: '사랑과 영혼' },
        { emoji: '👨‍🚀🐒🦴🎶', answer: '2001 스페이스 오디세이' },
        { emoji: '🚗💨🏜️🎸🔥', answer: '매드 맥스: 분노의 도로' },
        { emoji: '🤖❤️🌱🗑️', answer: '월-E' },
        { emoji: '🧞‍♂️램프🕌🐒', answer: '알라딘' },
        { emoji: '🤠🚀🧸🐍', answer: '토이스토리' },
        { emoji: '🎈🏠👴🏻👦뱃지', answer: '업' },
        { emoji: '🌊 nemo 아빠', answer: '니모를 찾아서' },
        { emoji: '🏹👩‍🦰🎯🐻', answer: '메리다와 마법의 숲' },
        { emoji: '🧠😊😥😡🤢😨', answer: '인사이드 아웃' },
        { emoji: '🚆🧟‍♂️👨‍👧🇰🇷', answer: '부산행' },
        { emoji: '🐔👮‍♂️🍗😂', answer: '극한직업' },
        { emoji: '👨‍⚖️👻 CG', answer: '신과함께' },
        { emoji: '🔨🐙📺 복수', answer: '올드보이' },
        { emoji: '🏹🎯 조선시대', answer: '최종병기 활' }
    ];

    let questions = [];
    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    const shuffle = (array) => array.sort(() => 0.5 - Math.random());

    const startGame = () => {
        questions = shuffle([...allQuestions]).slice(0, 10);
        currentQuestionIndex = 0;
        correctAnswers = 0;
        
        showScreen(gameScreen);
        displayQuestion();
    };

    const displayQuestion = () => {
        const question = questions[currentQuestionIndex];
        document.getElementById('emoji-box').innerText = question.emoji;
        document.getElementById('status').innerText = `문제 ${currentQuestionIndex + 1} / ${questions.length}`;
        resetAnswerUI();
    };

    const resetAnswerUI = () => {
        answerInput.value = '';
        document.getElementById('input-container').style.display = 'flex';
        document.getElementById('answer-container').style.display = 'none';
        document.getElementById('feedback').innerText = '';
        answerInput.focus();
    };

    const normalizeString = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

    const checkAnswer = () => {
        const userAnswer = normalizeString(answerInput.value);
        const correctAnswer = normalizeString(questions[currentQuestionIndex].answer);
        const feedback = document.getElementById('feedback');

        if (userAnswer === correctAnswer) {
            feedback.innerText = '정답입니다!';
            feedback.style.color = '#28a745';
            correctAnswers++;
        } else {
            feedback.innerText = '틀렸습니다!';
            feedback.style.color = '#dc3545';
        }
        
        showAnswer();
    };
    
    const showAnswer = () => {
        document.getElementById('input-container').style.display = 'none';
        document.getElementById('answer-container').style.display = 'flex';
        document.getElementById('answer-text').innerText = `정답: ${questions[currentQuestionIndex].answer}`;
    };

    const nextQuestion = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    };

    const showResult = () => {
        document.getElementById('result-text').innerText = `게임 종료!\n${correctAnswers}개 맞췄어요!`;
        showScreen(resultContainer);
    };
    
    const showScreen = (screenToShow) => {
        [mainScreen, gameScreen, resultContainer].forEach(screen => {
            screen.style.display = 'none';
            screen.style.opacity = '0';
        });
        screenToShow.style.display = 'flex';
        setTimeout(() => screenToShow.style.opacity = '1', 10);
    };

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', () => showScreen(mainScreen));
    confirmButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (document.getElementById('input-container').style.display === 'flex') {
                checkAnswer();
            }
        }
    });
    
    // '다음 문제' 버튼이 보일 때 Enter 키를 누르면 다음 문제로 넘어가는 기능 추가
    document.addEventListener('keydown', (event) => {
       if (event.key === 'Enter') {
            if (document.getElementById('answer-container').style.display === 'flex') {
                nextQuestion();
            }
        }
    });
});
