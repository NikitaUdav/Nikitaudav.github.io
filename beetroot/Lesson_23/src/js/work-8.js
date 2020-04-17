"use strict";
const money = prompt(`Укажите количество денег которое у вас есть`);
const product = prompt(`Укажите сколько стоит шоколадка`);
if (isNaN(money) && isNaN(product)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (money <= 0 && product <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = Math.fround(money / product);
  let wholeQ = Math.floor(result);
  let remainder = result - wholeQ;
  result = product * remainder;
  alert(
    `Вам дадут ${wholeQ} плиток шоколада и ${result.toFixed(2)} денег здачи`
  );
}
