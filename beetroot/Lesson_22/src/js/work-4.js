"use strict";
const radius = prompt(`Введите радиус окружности для получения площади.`);
if (isNaN(radius)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (radius <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = Math.PI * Math.pow(radius, 2);
  alert(`Площадь окружности = ${result.toFixed(3)}`);
}
