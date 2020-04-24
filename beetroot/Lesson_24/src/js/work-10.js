"use strict";
const diffDates = function diffDatefunc(date1, date2) {
  if (isNaN(date1) || isNaN(date2)) {
    return `Ошибка ввода`;
  } else return (date2 - date1) / (60 * 60 * 24 * 1000);
};

const day1 = prompt(`Укажите день 1 `);
const month1 = prompt(`Укажите месяц 1`);
const year1 = prompt(`Укажите год 1`);

const day2 = prompt(`Укажите день 2 `);
const month2 = prompt(`Укажите месяц 2`);
const year2 = prompt(`Укажите год 2`);

const date1 = new Date(year1, month1, day1);
const date2 = new Date(year2, month2, day2);

alert(`Разница в ${diffDates(date1, date2)} дней`);
