import StatsView from './stats-view';
import { onBackClick } from '../../blocks/header'

export default class {
    constructor() {
        this._view = new StatsView();
    }

    init() {
        this._view.show();
        this._view.onBackClick = onBackClick;
    }
}