"use strict";
const EURO = 0.92;
const AZN = 0.58;
const UAH = 0.03673;
let result;
const dolarValue = prompt(`Сколько Доляров вы хотите поменять ?`);
const valute = prompt(
  `выберете валюту ( 1 ) - ЕВРО ( 2 ) - ГРИВНА ( 3 ) - Азербайджанский манат `
);
if (isNaN(dolarValue || valute)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (dolarValue <= 0 || valute <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  switch (Number(valute)) {
    case 1:
      result = dolarValue * EURO;
      alert(`Вы получите ${result} Евро`);
      break;
    case 2:
      result = dolarValue / UAH;
      alert(`Вы получите ${result} Гривны`);
      break;
    case 3:
      result = dolarValue / AZN;
      alert(`Вы получите ${result} Маната`);
      break;
    default:
      alert(`что то пошло не так`);
      break;
  }
}
