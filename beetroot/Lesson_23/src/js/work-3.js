"use strict";
const number = prompt(`Укажите число для проверки совпадения`);
if (isNaN(number)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else {
  if (
    number[0] === number[1] &&
    number[0] != undefined &&
    number[1] != undefined
  ) {
    alert(`В этом числе есть одинаковые числа и это ${number[0]}`);
  } else if (
    number[1] === number[2] &&
    number[1] != undefined &&
    number[2] != undefined
  ) {
    alert(`В этом числе есть одинаковые числа и это ${number[1]}`);
  } else if (
    number[0] === number[2] &&
    number[0] != undefined &&
    number[2] != undefined
  ) {
    alert(`В этом числе есть одинаковые числа и это ${number[2]}`);
  } else {
    alert(`В этом числе нет одинаковых чисел`);
  }
}
