"use strict";
const sum = function sumfun(first, second) {
  let result;
  console.log(first, second);
  if (isNaN(first) || first === 0) {
    result = second * 4;
  } else if (isNaN(second) || second === 0) {
    result = first * 4;
  } else {
    result = first * second;
  }
  return result;
};

const nuber1 = prompt(`Укажите первое число`);
const nuber2 = prompt(`Укажите второе число`);

alert(`${sum(Number(nuber1), Number(nuber2))}`);
