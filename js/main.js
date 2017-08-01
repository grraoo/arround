import { render } from './render'
import { renderGreeting } from './greeting'

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

const initialState = {
    level: 1,
    time: 0,
    lives: 3
}

const levels = {
  '1': {
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      `https://k42.kn3.net/CF42609C8.jpg`,
      `http://i.imgur.com/1KegWPz.jpg`
    ]
  },
  '2': {
    question: `Угадай, фото или рисунок?`,
    answers: [
      `https://k32.kn3.net/5C7060EC5.jpg`
    ]
  },
  '3': {
    question: `Найдите рисунок среди изображений`,
    answers: [
      `http://i.imgur.com/DKR1HtB.jpg`,
      `http://i.imgur.com/1KegWPz.jpg`,
      `https://i.imgur.com/DiHM5Zb.jpg`
    ]
  }
}

render(0);

let starBtn = document.querySelector('.intro__asterisk');
starBtn.addEventListener('click', renderGreeting)
