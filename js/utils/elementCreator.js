export default function createDOMElement(markup) {
    let elem = document.createElement('template');
    elem.innerHTML = markup;
    return elem.content;
}