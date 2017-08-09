import GreetingView from './greeting-view'
import Application from '../../application'

export default class {
    constructor() {
        this._view = new GreetingView();
        this._view.onStart = () => {
            Application.showRules();
        }
        this._view.onBackClick = () => {
            Application.showIntro();
        }
    }
    
    init() {
        this._view.show();
    }
}