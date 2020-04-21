"use strict";
let question = [];
let sumAnswer = 0;
alert(
  `Здравствуйте ! Сейчас будет проведен тест на знания столиц стран мира. Необходимо отвечать только число пример 2 , иначе ответ не будет засчитан. удачи!!!`
);
question[0] = prompt(
  `Укажите столицу Украины (1 - Киев, 2 - Бейрут, 3 - Греция)`
);
question[1] = prompt(
  `Укажите столицу Италии  (1 - Рим, 2 - Мехико, 3 - Мадрид)`
);
question[2] = prompt(
  `Укажите столицу Сирии  (1 - Дакар, 2 - Белград, 3 - Дамаск)`
);
question[3] = prompt(
  `Укажите столицу Турции  (1 - Ташкент  , 2 - Анкара, 3 - Тунис)`
);
question[4] = prompt(
  `Укажите столицу Хорватии  (1 - Загреб, 2 - Сува, 3 - Хельсинки)`
);

for (let i = 0; i < question.length; i++) {
  switch (i) {
    case 0:
      if (Number(question[i]) === 1) {
        sumAnswer = sumAnswer + 2;
      }
      break;
    case 1:
      if (Number(question[i]) === 1) {
        sumAnswer = sumAnswer + 2;
      }
      break;
    case 2:
      if (Number(question[i]) === 3) {
        sumAnswer = sumAnswer + 2;
      }
      break;
    case 3:
      if (Number(question[i]) == 3) {
        sumAnswer = sumAnswer + 2;
      }
      break;
    case 4:
      if (Number(question[i]) == 1) {
        sumAnswer = sumAnswer + 2;
      }
      break;
    default:
      break;
  }
}
console.log(question[0]);
console.log(question[1]);
console.log(question[2]);
console.log(question[3]);
console.log(question[4]);

alert(`Поздравляю вы набрали ${sumAnswer} балов из 10`);
