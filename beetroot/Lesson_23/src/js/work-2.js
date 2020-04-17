"use strict";
let number = prompt(`Здарова бро! Какой сивол вывести `);
if (number < 0) {
  number = -number;
}
switch (Number(number)) {
  case 0:
    alert(`ваши символы = )`);
    break;
  case 1:
    alert(`ваши символы = !`);
    break;
  case 2:
    alert(`ваши символы = @ "`);
    break;
  case 3:
    alert(`ваши символы = # №`);
    break;
  case 4:
    alert(`ваши символы = $ ;`);
    break;
  case 5:
    alert(`ваши символы = %`);
    break;
  case 6:
    alert(`ваши символы = ^ :`);
    break;
  case 7:
    alert(`ваши символы = & ?`);
    break;
  case 8:
    alert(`ваши символы = *`);
    break;
  case 9:
    alert(`ваши символы = ( `);
    break;
  default:
    alert(`что то пошло не так`);
    break;
}
