export default function createDOMElement(markup) {
    let elem = document.createElement('div');
    elem.innerHTML = markup;
    return elem;
}