"use strict";
const EAR = 2020;
const bornDate = prompt(
  `Здарова бро! Когда ты родился бро ?! (укажите год рождения)`
);
if (isNaN(bornDate)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (bornDate <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = EAR - bornDate;
  if (result <= 0) {
    alert(`Биджо до твоего рождения еще ${-result} лет`);
  } else if (result > 100) {
    alert(`Бро ты скорее всего бог или умер. тебе ${result} лет`);
  } else {
    alert(`Бро тебе ${result} лет !`);
  }
}
