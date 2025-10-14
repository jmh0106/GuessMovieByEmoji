document.addEventListener('DOMContentLoaded', () => {
    // 화면 요소
    const mainScreen = document.getElementById('main-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultContainer = document.getElementById('result-container');
    
    // 버튼 요소
    const categoryButtons = document.querySelectorAll('.category-button');
    const restartButton = document.querySelector('.restart-button');
    const confirmButton = document.querySelector('.confirm-button');
    const nextButton = document.querySelector('.next-button');
    
    // 입력 및 텍스트 요소
    const answerInput = document.getElementById('answer-input');
    const statusText = document.getElementById('status');
    const emojiBox = document.getElementById('emoji-box');
    const feedbackText = document.getElementById('feedback');
    const answerText = document.getElementById('answer-text');
    const resultText = document.getElementById('result-text');

    // UI 컨테이너
    const inputContainer = document.getElementById('input-container');
    const answerContainer = document.getElementById('answer-container');

    const questionsData = {
        movies: [
            { emoji: '🚢🧊💔👫🎨', answer: '타이타닉' },
            { emoji: '🦸‍♂️🦸‍♀️🔨🛡️🕷️💎', answer: '어벤져스' },
            { emoji: '🧑‍🚀🌌🕰️👨‍👧📖', answer: '인터스텔라' },
            { emoji: '🤡🃏🧠💃🕺', answer: '조커' },
            { emoji: '🦖🏝️🚙琥珀', answer: '쥬라기 공원' },
            { emoji: '🔵🔴💊🥋🕶️', answer: '매트릭스' },
            { emoji: '🎹🎶💖🌃', answer: '라라랜드' },
            { emoji: '🍫🍤🏃‍♂️🇺🇸', answer: '포레스트 검프' },
            { emoji: '🦇🤵‍♂️💰💣', answer: '다크 나이트' },
            { emoji: '😴🌀🗼🤔', answer: '인셉션' }
        ],
        animation: [
            { emoji: '🦁👑🐗🦓🦒', answer: '라이온 킹' },
            { emoji: '❄️👸☃️🎶', answer: '겨울왕국' },
            { emoji: '🤖❤️🌱🗑️', answer: '월-E' },
            { emoji: '🧞‍♂️램프🕌🐒', answer: '알라딘' },
            { emoji: '🤠🚀🧸🐍', answer: '토이스토리' },
            { emoji: '🎈🏠👴🏻👦뱃지', answer: '업' },
            { emoji: '🌊🐠👨‍👦🔍', answer: '니모를 찾아서' },
            { emoji: '🧠😊😥😡🤢😨', answer: '인사이드 아웃' },
            { emoji: '🐷🍜🥟🥋🐼', answer: '쿵푸팬더' },
            { emoji: '🐉⚔️👦🏻🏰', answer: '드래곤 길들이기'}
        ],
        books: [
            { emoji: '🧙‍♂️⚡️🚂🏰🐍', answer: '해리포터' },
            { emoji: '🧑🏻‍⚖️👨‍🦳🍞⛓️🇫🇷', answer: '레 미제라블' },
            { emoji: '💍🌋🧙‍♂️👣', answer: '반지의 제왕' },
            { emoji: '🦊🌹✈️🤴', answer: '어린왕자' },
            { emoji: '🎩🧐🔍🇬🇧', answer: '셜록 홈즈' },
            { emoji: '🐯🛶🌊🕉️', answer: '파이 이야기' },
            { emoji: '👴🏻🎣🦈🌊', answer: '노인과 바다' },
            { emoji: '👧🌪️🦁🤖 tin man', answer: '오즈의 마법사' },
            { emoji: '🎩🍫🏭🎟️', answer: '찰리와 초콜릿 공장' },
            { emoji: '👩‍❤️‍👨 Prejudice pride', answer: '오만과 편견'}
        ]
    };

    let questions = [];
    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    const shuffle = (array) => array.sort(() => 0.5 - Math.random());

    const startGame = (category) => {
        const selectedQuestions = questionsData[category];
        if (!selectedQuestions) return;

        questions = shuffle([...selectedQuestions]).slice(0, 10);
        currentQuestionIndex = 0;
        correctAnswers = 0;
        
        showScreen(gameScreen);
        displayQuestion();
    };

    const displayQuestion = () => {
        if (currentQuestionIndex >= questions.length) {
            showResult();
            return;
        }
        const question = questions[currentQuestionIndex];
        emojiBox.innerText = question.emoji;
        statusText.innerText = `문제 ${currentQuestionIndex + 1} / ${questions.length}`;
        resetAnswerUI();
    };

    const resetAnswerUI = () => {
        answerInput.value = '';
        feedbackText.innerText = '';
        inputContainer.style.display = 'flex';
        answerContainer.style.display = 'none';
        answerInput.focus();
    };

    const normalizeString = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

    const checkAnswer = () => {
        const userAnswer = normalizeString(answerInput.value);
        if (userAnswer === '') return;

        const correctAnswer = normalizeString(questions[currentQuestionIndex].answer);
        
        if (userAnswer === correctAnswer) {
            feedbackText.innerText = '정답입니다!';
            feedbackText.style.color = '#28a745';
            correctAnswers++;
        } else {
            feedbackText.innerText = '틀렸습니다!';
            feedbackText.style.color = '#dc3545';
        }
        
        showAnswer();
    };
    
    const showAnswer = () => {
        answerText.innerText = `정답: ${questions[currentQuestionIndex].answer}`;
        inputContainer.style.display = 'none';
        answerContainer.style.display = 'flex';
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
        resultText.innerHTML = `게임 종료!<br>${questions.length} 문제 중 ${correctAnswers}개 맞췄어요!`;
        showScreen(resultContainer);
    };
    
    const showScreen = (screenToShow) => {
        [mainScreen, gameScreen, resultContainer].forEach(screen => {
            screen.style.display = 'none';
            screen.style.opacity = '0';
        });
        screenToShow.style.display = 'flex';
        setTimeout(() => screenToShow.style.opacity = '1', 50);
    };

    // 이벤트 리스너 설정
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            startGame(category);
        });
    });

    restartButton.addEventListener('click', () => showScreen(mainScreen));
    confirmButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
    
    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (inputContainer.style.display === 'flex') {
                checkAnswer();
            }
        }
    });
    
    document.addEventListener('keydown', (event) => {
       if (event.key === 'Enter') {
            if (answerContainer.style.display === 'flex') {
                nextQuestion();
            }
        }
    });
});
