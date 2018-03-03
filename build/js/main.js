(function () {
'use strict';

function render(view) {
    let contentScreen = document.querySelector(`.central`);
    contentScreen.innerHTML = '';
    contentScreen.appendChild(view.element);
}

class AbstractView {
    get template() {
        throw new Error('Template isn\'t defined!');
    }
    
    get element() {
        if (!this._element) {
            this._element = this._render();
            this.bind();
        }
        
        return this._element;
    }
    
    _render() {
        return this.createDOMElement(this.template);
    }
    
    createDOMElement(markup) {
        let elem = document.createElement('template');
        elem.innerHTML = markup;
        return elem.content;
    }
    
    show() {
        render(this);
    }
    
    bind() {}
}

class IntroView extends AbstractView {
    get template() {
        return `<div id="intro" class="intro">
            <h1 class="intro__asterisk">*</h1>
            <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>`
    }
    
    bind() {
        let starBtn = this.element.querySelector('.intro__asterisk');
        starBtn.addEventListener('click', () => {
            this.onStart();
        });
    }
    
    onStart() {}
}

var Intro = class {
    constructor() {
        this._view = new IntroView();
        this._view.onStart = () => {
            app.showGreeting();
        };
    }
    
    init() {
        this._view.show();
    }
};

function footer() {
    return `
        <footer class="footer">
            <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
            <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
            <div class="footer__social-links">
                <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
                <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
                <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
                <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
            </div>
        </footer>`
}

function lives(lives) {
    let livesTemplate = `
        <div class="game__lives">
            ${new Array(3 - lives).fill(getHeartTemplate('img/heart__empty.svg')).join(``)}
            ${new Array(lives).fill(getHeartTemplate('img/heart__full.svg')).join(``)}
        </div>`;

    return livesTemplate;
}

function getHeartTemplate(url) {
    return `<img src="${url}" class="game__heart" alt="Life" width="32" height="32">`;
}

const onBackClick = () => {
    app.showIntro();
};

function header(state = null) {
    let content = '';
    if (state) {
        let { lives: lives$$1, time } = state;
        content = state ? `<h1 class="game__timer">${time}</h1>
            ${lives(lives$$1)}` : '';
    }
    
    let headerTemplate = `<header class="header">
        <div class="header__back">
            <span class="back">
                <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
                <img src="img/logo_small.png" width="101" height="44">
            </span>
        </div>
        ${content}
      </header>`;
      
    return headerTemplate;
}

function lvlStats(stats = []) {
    return `<div class="stats">
      <ul class="stats">
        ${stats.map((status) => `<li class="stats__result stats__result--${status}"></li>`).join('')}
      </ul>
    </div>`;
}

class GreetingView extends AbstractView {
    get template() {
        return `
          ${header()}
          <div class="greeting central--blur">
            <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
            <h1 class="greeting__asterisk">*</h1>
            <div class="greeting__challenge">
              <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
              <p>Правила игры просты.<br>
                Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
                Задача кажется тривиальной, но не думай, что все так просто.<br>
                Фотореализм обманчив и коварен.<br>
                Помни, главное — смотреть очень внимательно.</p>
            </div>
            <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
          </div>
          ${footer()}`
    }
    
    bind() {
        let backBtn = this.element.querySelector('.back');
        let openRulesBtn = this.element.querySelector('.greeting__continue');
        openRulesBtn.addEventListener('click', () => {
            this.onStart();
        });
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        });
    }
    
    onStart() {}
    
    onBackClick() {}
}

var Greeting = class {
    constructor() {
        this._view = new GreetingView();
        this._view.onStart = () => {
            app.showRules();
        };
        this._view.onBackClick = () => {
            app.showIntro();
        };
    }
    
    init() {
        this._view.show();
    }
};

class RulesView extends AbstractView {
    get template() {
        return `
        ${header()}
        <div class="rules">
            <h1 class="rules__title">Правила</h1>
            <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
              src="img/photo_icon.png" width="16" height="16"> или рисунок <img
              src="img/paint_icon.png" width="16" height="16" alt="">.<br>
              Фотографиями или рисунками могут быть оба изображения.<br>
              На каждую попытку отводится 30 секунд.<br>
              Ошибиться можно не более 3 раз.<br>
              <br>
              Готовы?
            </p>
            <form class="rules__form">
              <input class="rules__input" type="text" placeholder="Ваше Имя">
              <button class="rules__button  continue" type="submit" disabled>Go!</button>
            </form>
          </div>`
    }
    
    bind() {
        let startGameBtn = this.element.querySelector('.rules__button');
        let nameField = this.element.querySelector('.rules__input');
        let backBtn = this.element.querySelector('.back');
        
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        });
        
        startGameBtn.disabled = true;        
        
        nameField.addEventListener('keyup', () => {
           startGameBtn.disabled = nameField.value ? false : true;
        }); 
        
        startGameBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.onStartGame();
        });
    }
    
    onStartGame() {}
    
    onBackClick() {}
}

var Rules = class {
    constructor() {
        this._view = new RulesView();
        this._view.onStartGame = () => {
            app.showGame();
        };
        this._view.onBackClick = () => {
            app.showGreeting();
        };
    }
    
    init() {
        this._view.show();
    }
};

const MAX_QUESTIONS_COUNT = 3;
const TIME_FOR_QUESTION$2 = 30;
const MAX_LIVES = 3;
const START_LEVEL = 1;

const initialState = {
    answers: [],
    questionCount: MAX_QUESTIONS_COUNT,
    level: null,
    levelNum: START_LEVEL,
    time: TIME_FOR_QUESTION$2,
    timer: null,
    lives: MAX_LIVES,
    stats: new Array(MAX_QUESTIONS_COUNT).fill('unknown')
};

const levels = {
  '1': {
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
        {
            image: `https://k42.kn3.net/CF42609C8.jpg`,
            type: 'paint'
        },
        {
            image: `http://i.imgur.com/1KegWPz.jpg`,
            type: 'photo'
        }
    ]
  },
  '2': {
    question: `Угадай, фото или рисунок?`,
    answers: [
        {
            image: `https://k32.kn3.net/5C7060EC5.jpg`,
            type: 'paint'
        }
    ]
  },
  '3': {
    question: `Найдите рисунок среди изображений`,
    answers: [
        {
            image: `http://i.imgur.com/DKR1HtB.jpg`,
            type: 'paint'
        },
        {
            image: `http://i.imgur.com/1KegWPz.jpg`,
            type: 'photo'
        },
        {
            image: `http://i.imgur.com/1KegWPz.jpg`,
            type: 'photo'
        }
    ]
  }
};

function calculateAspectRatioFit(img) {
    const parentWidth = img.parentNode.clientWidth;
    const parentHeight = img.parentNode.clientHeight;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (imgWidth > imgHeight) {
        img.width = parentWidth;
    } else {
        img.height = parentHeight;
    }
}

function checkAnswers(formElements) {
    return [].filter.call(formElements, (el) => el.checked).length === formElements.length / 2
}

const TIME_FOR_QUESTION$3 = 30;



function checkAnswers$1(state, answers) {
    return levels[state.levelNum].answers.every((answer, i) => {
        return answers[i] === answer.type
    })
}





function generateGameStat(state, isAnswerCorrect, time) {
    const newGameStats = state.stats.slice();
    let answerParam = null;
    let getAnswerParam = () => {
        if (isAnswerCorrect) {
            if (time < 10) {
                return 'fast';
            } else if (time > 20 && time <= 30) {
                return 'slow';
            } else if (time >= 10 && time <= 20){
                return 'correct';
            } else if (time === -1) {
                return 'wrong';
            }
        }

        return 'wrong'
    };

    time = TIME_FOR_QUESTION$3 - time;
    newGameStats[state.levelNum - 1] = getAnswerParam();
    return newGameStats;
}

function game(stats, level) {
    let answers = level.answers.map((answer, i) => {
        return `
            <div class="game__option">
                <img src="${answer.image}" alt="Option ${i+1}" width="468" height="458">
                <label class="game__answer game__answer--photo">
                    <input name="question${i+1}" type="radio" value="photo">
                    <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint">
                    <input name="question${i+1}" type="radio" value="paint">
                    <span>Рисунок</span>
                </label>
            </div>`
    }).join('');
    let gameTemplate = `
        <div class="game">
            <p class="game__task">${level.question}</p>
            <form class="game__content">
                ${answers}
            </form>
            <div class="stats">
                <ul class="stats">
                    ${lvlStats(stats)}
                </ul>
            </div>
        </div>`;

    return gameTemplate;
}

class Game1View extends AbstractView {
    constructor(state) {
        super();
        this._state = state;
    }
    
    get template() {
        return `
            ${header(this._state)}
            ${game(this._state.stats, levels[this._state.levelNum])}
            ${footer()}` 
    }
    
    bind() {
        let gameArea = this.element.querySelector('.game__content');
        let formElements = gameArea.elements;
        let images = this.element.querySelectorAll(`.game__option > img`);
        let gameTimer = this.element.querySelector('.game__timer');
        let backBtn = this.element.querySelector('.back');
        
        Array.prototype.forEach.call(images, (img) => {
            img.addEventListener(`load`, (event) =>{
                calculateAspectRatioFit(img);
            });
        });
        
        gameArea.addEventListener('click', () => {
            if (checkAnswers(formElements)) {
                let answerValues = [].filter.call(formElements, (answer) => answer.checked).map((answer) => answer.value);
                let isCorrect = checkAnswers$1(this._state, answerValues);
                clearInterval(this._state.timer);
                this._state.stats = generateGameStat(this._state, isCorrect, this._state.time);
                if (!isCorrect)
                    this._state.lives--;
                this.onChangeGameScreen();
            }
        });
        
        this._state.timer = setInterval(() => {
            this._state.time--;
            gameTimer.innerHTML = this._state.time;
        }, 1000);
        
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        });
    }
    
    onChangeGameScreen() {}
}

class Game2View extends AbstractView {
    constructor(state) {
        super();
        this._state = state;
    }
    
    get template() {
        return `
            ${header(this._state)}
            ${game(this._state.stats, levels[this._state.levelNum])}
            ${footer()}` 
    }
    
    bind() {
        let gameArea = this.element.querySelector('.game__content');
        let formElements = gameArea.elements;
        let images = this.element.querySelectorAll(`.game__option > img`);
        let gameTimer = this.element.querySelector('.game__timer');
        let backBtn = this.element.querySelector('.back');
            
        Array.prototype.forEach.call(images, (img) => {
            img.addEventListener(`load`, (event) =>{
                calculateAspectRatioFit(img);
            });
        });
        
        let gameForm = this.element.querySelector('.game__content');
        gameForm.addEventListener('click', (ev) => {
            if (checkAnswers(formElements)) {
                let answerValues = [].filter.call(formElements, (answer) => answer.checked).map((answer) => answer.value);
                let isCorrect = checkAnswers$1(this._state, answerValues);
                clearInterval(this._state.timer);
                this._state.stats = generateGameStat(this._state, isCorrect, this._state.time);
                if (!isCorrect)
                    this._state.lives--;
                this.onChangeGameScreen();
            }
        });
        
        this._state.timer = setInterval(() => {
            this._state.time--;
            gameTimer.innerHTML = this._state.time;
        }, 1000);
        
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        });
    }
    
    onChangeGameScreen() {}
}

class Game3View extends AbstractView {
    constructor(state) {
        super();
        this._state = state;
    }
    
    get template() {
        return `
            ${header(this._state)}
            ${game(this._state.stats, levels[this._state.levelNum])}
            ${footer()}`
    }
    
    bind() {
        let gameArea = this.element.querySelector('.game__content');
        let formElements = gameArea.elements;
        let images = this.element.querySelectorAll(`.game__option > img`);
        let gameTimer = this.element.querySelector('.game__timer');
        let backBtn = this.element.querySelector('.back');
        
        Array.prototype.forEach.call(images, (img) => {
            img.addEventListener(`load`, (event) => {
                calculateAspectRatioFit(img);
            });
        });
        
        gameArea.addEventListener('click', (ev) => {
            if (checkAnswers(formElements)) {
                let answerValues = [].filter.call(formElements, (answer) => answer.checked).map((answer) => answer.value);
                let isCorrect = checkAnswers$1(this._state, answerValues);
                clearInterval(this._state.timer);
                this._state.stats = generateGameStat(this._state, isCorrect, this._state.time);
                if (!isCorrect)
                    this._state.lives--;
                this.onChangeGameScreen();
            }
        });
        
        this._state.timer = setInterval(() => {
            this._state.time--;
            gameTimer.innerHTML = this._state.time;
        }, 1000);
        
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        });
    }
    
    onChangeGameScreen() {}
}

const TIME_FOR_QUESTION = 30;

var Game = class {
    constructor() {
        this._state = Object.assign({}, initialState);
        this._gameScreenList = [Game1View, Game2View, Game3View];
        this._gameScreenNum = 0;
    }

    init() {
        this._screen.onBackClick = () => {
            app.showIntro();
        };
        this._screen.show();
    }

    get _screen() {
        if (!this._currentGameScreen)
            this._currentGameScreen = this._getGameScreen(this._state);

        return this._currentGameScreen;
    }

    _getGameScreen(state) {
        let currentGame = this._gameScreenList[this._gameScreenNum];
        const screen = new currentGame(state);
        if (this._gameScreenNum !== this._gameScreenList.length - 1)
            this._gameScreenNum++;
        screen.onChangeGameScreen = () => {
            this._checkAnswer();
        };

        return screen;
    }

    _checkAnswer() {
        if (this._state.questionCount)
            this._state.questionCount--;    
        if (this._state.questionCount > 0) {
            this._state.levelNum++;
            this._state.level = levels[this._state.levelNum];
            this._currentGameScreen = this._getGameScreen(this._state);
            this._stopTimer();
            this._resetTime();
            this._screen.onBackClick = () => {
                app.showIntro();
            };
            this._screen.show();
        } else {
            app.showStats();
        }
    }
    
    _stopTimer() {
        clearInterval(this._state.timer);
    }
    
    _resetTime() {
        this._state.time = TIME_FOR_QUESTION;
    }
};

var StatsView = class extends AbstractView {
    get template() {
        return `
        ${header()}
        <div class="result">
          <h1>Победа!</h1>
          <table class="result__table">
            <tr>
              <td class="result__number">1.</td>
              <td colspan="2">
                <ul class="stats">
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--slow"></li>
                  <li class="stats__result stats__result--fast"></li>
                  <li class="stats__result stats__result--correct"></li>
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--unknown"></li>
                  <li class="stats__result stats__result--slow"></li>
                  <li class="stats__result stats__result--unknown"></li>
                  <li class="stats__result stats__result--fast"></li>
                  <li class="stats__result stats__result--unknown"></li>
                </ul>
              </td>
              <td class="result__points">×&nbsp;100</td>
              <td class="result__total">900</td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">50</td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">100</td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">-100</td>
            </tr>
            <tr>
              <td colspan="5" class="result__total  result__total--final">950</td>
            </tr>
          </table>
          <table class="result__table">
            <tr>
              <td class="result__number">2.</td>
              <td>
                <ul class="stats">
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--slow"></li>
                  <li class="stats__result stats__result--fast"></li>
                  <li class="stats__result stats__result--correct"></li>
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--unknown"></li>
                  <li class="stats__result stats__result--slow"></li>
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--fast"></li>
                  <li class="stats__result stats__result--wrong"></li>
                </ul>
              </td>
              <td class="result__total"></td>
              <td class="result__total  result__total--final">fail</td>
            </tr>
          </table>
          <table class="result__table">
            <tr>
              <td class="result__number">3.</td>
              <td colspan="2">
                <ul class="stats">
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--slow"></li>
                  <li class="stats__result stats__result--fast"></li>
                  <li class="stats__result stats__result--correct"></li>
                  <li class="stats__result stats__result--wrong"></li>
                  <li class="stats__result stats__result--unknown"></li>
                  <li class="stats__result stats__result--slow"></li>
                  <li class="stats__result stats__result--unknown"></li>
                  <li class="stats__result stats__result--fast"></li>
                  <li class="stats__result stats__result--unknown"></li>
                </ul>
              </td>
              <td class="result__points">×&nbsp;100</td>
              <td class="result__total">900</td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">100</td>
            </tr>
            <tr>
              <td colspan="5" class="result__total  result__total--final">950</td>
            </tr>
          </table>
        </div>`
    }
    
    bind() {
        const backBtn = this.element.querySelector('.back');
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        });
    }
    
    onBackClick() {}
};

var Stats = class {
    constructor() {
        this._view = new StatsView();
    }

    init() {
        this._view.show();
        this._view.onBackClick = onBackClick;
    }
};

const GameState = {
    INTRO: '',
    GREETING: 'greeting',
    RULES: 'rules',
    GAME: 'game',
    STATS: 'stats'
};

const getGameStateFromHash = (hash) => hash.replace('#', '');

class Application {
    constructor() {
        this._routes = {
            [GameState.INTRO]: Intro,
            [GameState.GREETING]: Greeting,
            [GameState.RULES]: Rules,
            [GameState.GAME]: Game,
            [GameState.STATS]: Stats
        };
        
        window.onhashchange = () => {
            this._changeGameState(getGameStateFromHash(location.hash));
        };
    }

    init() {
        this._changeGameState(getGameStateFromHash(location.hash));
    }

    showIntro() {
        location.hash = GameState.INTRO;
    }

    showGreeting() {
        location.hash = GameState.GREETING;
    }

    showRules() {
        location.hash = GameState.RULES;
    }

    showGame() {
        location.hash = GameState.GAME;
    }

    showStats() {
        location.hash = GameState.STATS;
    }
    
    _changeGameState(route = GameState.INTRO) {
        const Screen = this._routes[route];
        if (!Screen) return
        new Screen().init();
    }
}

const app = new Application();

app.init();

}());

//# sourceMappingURL=main.js.map
