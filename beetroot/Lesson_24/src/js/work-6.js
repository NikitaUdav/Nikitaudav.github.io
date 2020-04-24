"use strict";
const perfectNumber = function (n, i = 1, sum = 0) {
  if (n / i < 1 || i >= n) {
    return n === sum && n;
  } else if (isNaN(n)) {
    return `Введено не число !`;
  }
  return perfectNumber(n, i + 1, n % i ? sum : sum + i);
};

const perfectRange = function (a, b) {
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  if (perfectNumber(min)) {
    alert(min);
  }
  if (min < max) {
    perfectRange(min + 1, max);
  }
  return;
};
const start = prompt(`Укажите начало диапазона`);
const end = prompt(`Укажите конец диапазона`);
perfectRange(Number(start), Number(end));
