"use strict";
const age = prompt(`Здарова бро! Сколько тебе лет ?!`);
if (isNaN(age)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (age == 0) {
  alert(`Биджо зачем ты написал 0 ???`);
} else if (age < 0) {
  alert(`Биджо до твоего рождения еще ${-age} лет`);
} else if (age > 0 && age <= 2) {
  alert(`Вы ребенок`);
} else if (age >= 12 && age <= 18) {
  alert(`Вы подросток`);
} else if (age >= 18 && age <= 60) {
  alert(`Вы взрослый`);
} else if (age > 60) {
  alert(`Вы пенсионер`);
}
