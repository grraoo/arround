import Game1View from './game1-view';
import Game2View from './game2-view';
import Game3View from './game3-view';
import { levels } from '../../data/data';
import { initialState } from '../../data/data';
import Application from '../../application';

const TIME_FOR_QUESTION = 30;

export default class {
    constructor() {
        this._state = Object.assign({}, initialState);
        this._gameScreenList = [Game1View, Game2View, Game3View];
        this._gameScreenNum = 0;
    }

    init() {
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
            this._state.questionCount--    
        if (this._state.questionCount > 0) {
            this._state.levelNum++;
            this._state.level = levels[this._state.levelNum];
            this._currentGameScreen = this._getGameScreen(this._state);
            this._stopTimer();
            this._resetTime();
            this._screen.show();
        } else {
            Application.showStats();
        }
    }
    
    _stopTimer() {
        clearInterval(this._state.timer);
    }
    
    _resetTime() {
        this._state.time = TIME_FOR_QUESTION;
    }
}
