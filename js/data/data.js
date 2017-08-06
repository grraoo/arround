export const initialState = {
    level: 1,
    time: 0,
    lives: 3 
}

export const levels = {
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
}

export const stats = new Map([
  [1, `slow`],
  [2, `wrong`],
  [3, `slow`],
  [4, `fast`],
  [5, `fast`],
  [6, `unknown`],
  [7, `slow`],
  [8, `fast`],
  [9, `fast`],
  [10, `slow`]
]);