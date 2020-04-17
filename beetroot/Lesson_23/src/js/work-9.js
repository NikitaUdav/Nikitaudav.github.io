"use strict";
const number = prompt(`Укажите число которое нужно развернуть`);

if (isNaN(number)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else {
  let result = number;
  result = result.split("").reverse().join("");
  alert(`Получите распишитесь ${result}`);
}
