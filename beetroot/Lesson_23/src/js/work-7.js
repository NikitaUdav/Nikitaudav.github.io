"use strict";
const money = prompt(`Укажите суму покупки`);
let result;
if (isNaN(money)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else {
  if (money >= 200 && money <= 300) {
    result = money - money * 0.03;
    alert(`Ваша скидка 3% итого к оплате ${result}`);
  } else if (money >= 300 && money <= 500) {
    result = money - money * 0.05;
    alert(`Ваша скидка 5% итого к оплате ${result}`);
  } else if (money >= 700) {
    result = money - money * 0.07;
    alert(`Ваша скидка 7% итого к оплате ${result}`);
  } else {
    alert(`У вас нет скидки`);
  }
}
