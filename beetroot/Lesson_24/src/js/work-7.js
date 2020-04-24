"use strict";
const setTime = (hh, mm = 0, ss = 0) => {
  const now = new Date();
  now.setHours(hh, mm, ss);
  return now.toLocaleTimeString("ru", {
    hours: "numeric",
    minutes: "numeric",
    seconds: "numeric",
  });
};
const hh = prompt(`Укажите часы`);
const mm = prompt(`Укажите минуты`);
const ss = prompt(`Укажите секунды`);
alert(`${setTime(Number(hh), Number(mm), Number(ss))}`);
