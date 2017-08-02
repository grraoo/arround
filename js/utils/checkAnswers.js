export default function checkAnswers(formElements) {
    return [].filter.call(formElements, (el) => el.checked).length === formElements.length / 2
}