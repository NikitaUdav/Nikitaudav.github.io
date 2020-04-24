"use strict";
const setTime = (hh, mm = 0, ss = 0) => {
  const now = new Date();
  now.setHours(hh, mm, ss);
  return now;
};
const getTimeInSeconds = (...args) => {
  console.log(args);
  const now = new Date(setTime(...args));
  const hhInSeconds = now.getHours() * 60 * 60;
  const mmInSeconds = now.getMinutes() * 60;
  return hhInSeconds + mmInSeconds + now.getSeconds();
};

const hh = prompt(`Укажите время`);
const mm = prompt(`Укажите минуты`);
const ss = prompt(`Укажите секунды`);
alert(`${getTimeInSeconds(Number(hh), Number(mm), Number(ss))}`);
