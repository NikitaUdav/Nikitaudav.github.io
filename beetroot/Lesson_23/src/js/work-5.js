"use strict";
const distance = prompt(`Укажите растояние между городами в (км)`);
const time = prompt(`Укажите время за которое вы хотите добратся в (ч)`);
if (isNaN(distance) || isNaN(time)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (distance <= 0 || time <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let result = distance / time;
  alert(`Вам необходимо ехать со скоростью ${result} км/ч`);
}
