"use strict";
const sayhi = function seyhiFunc(first, second) {
  let result = 0;
  first < second
    ? (result = -1)
    : first === second
    ? (result = 0)
    : (result = 1);
  alert(`${first}, ${second}`);
  return result;
};

const nuber1 = prompt(`Укажите первое число`);
const nuber2 = prompt(`Укажите второе число`);
alert(`${sayhi(Number(nuber1), Number(nuber2))}`);
