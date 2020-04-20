"use strict";
let number = prompt(`Введите число для проверки`);
if (isNaN(number)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else {
  let result = number;
  result = result.split("").reverse().join("");
  if (result === number) {
    alert(`${result} является полиндромом`);
  } else {
    alert(`${number} не является полиндромом`);
  }
}
