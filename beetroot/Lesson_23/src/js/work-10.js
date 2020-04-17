"use strict";
const money = prompt(`Укажите суму вклада под 5% годовых`);
const procent = 0.05;
if (isNaN(money)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else {
  let casheProcent = (money * procent) / 6;
  let result = casheProcent + +money;
  alert(`Получите ${result} за 2 месяца вклада`);
}
