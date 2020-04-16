"use strict";
const file = 820;
const size = prompt(`Сколько ГБ памяти у вас есть ?`);
if (isNaN(size)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (size <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = Math.trunc((size * 1000) / file);
  alert(`У вас получится записать ${result} файл(ов) !`);
}
