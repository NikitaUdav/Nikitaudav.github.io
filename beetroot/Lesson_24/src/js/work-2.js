"use strict";
const factorial = function (n) {
  if (n) {
    return n * factorial(n - 1);
  }
  return 1;
};

const nuber1 = prompt(`Укажите первое число`);
alert(`${factorial(Number(nuber1))}`);
