"use strict";
const sum = (...args) => {
  console.log(args);
  return args.join("");
};
const nuber1 = prompt(`Укажите первое число`);
const nuber2 = prompt(`Укажите второе число`);
const nuber3 = prompt(`Укажите третье число`);
alert(`${sum(Number(nuber1), Number(nuber2), Number(nuber3))}`);
