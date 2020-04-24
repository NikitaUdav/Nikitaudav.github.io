"use strict";
const perfectNumber = function (n, i = 1, sum = 0) {
  if (n / i < 1 || i >= n) {
    return n === sum;
  } else if (isNaN(n)) {
    return `Введено не число !`;
  }
  return perfectNumber(n, i + 1, n % i ? sum : sum + i);
};

const nuber = prompt(`Укажите число`);
alert(`${perfectNumber(Number(nuber))}`);
