"use strict";
const EURO = 0.92;
const dolarValue = prompt(`Сколько Доляров вы хотите поменять ?`);
if (isNaN(dolarValue)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (dolarValue <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = dolarValue * EURO;
  alert(`У вас получится ${result} ЕВРО !`);
}
