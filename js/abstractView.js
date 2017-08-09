import render from './utils/render'

export default class AbstractView {
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