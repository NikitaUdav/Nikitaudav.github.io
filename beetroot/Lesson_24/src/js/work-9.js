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
const getTimeInHour = (seconds) => {
  if (isNaN(seconds)) {
    return `Введено не число !!!`;
  } else {
    let timeSeconds = seconds % 60;
    let timeMinutes = Math.floor(seconds / 60);
    let timeHour = Math.floor(timeMinutes / 60);
    timeMinutes = timeMinutes % 60;
    let timeDay = Math.floor(timeHour / 24);
    timeHour = timeHour % 24;
    console.log(timeDay);
    return `${timeDay} - day ${setTime(timeHour, timeMinutes, timeSeconds)}`;
  }
};

const ss = prompt(`Укажите секунды`);
alert(`${getTimeInHour(Number(ss))}`);
