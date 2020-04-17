"use strict";
const length = prompt(
  `Укажите длинну стороны квадрата, для того чтоб узнать периметр.`
);
if (isNaN(length)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (length <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = length * 4;
  alert(`Периметр квадрата = ${result}`);
}
