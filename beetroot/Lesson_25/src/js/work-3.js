"use strict";
const isObject = (obj) => typeof obj === "object";
let time = {
  hours: 15,
  minutes: 0,
  seconds: 0,
};
const showTime = function showTimeFunc(time) {
  if (isObject(time)) {
    const now = new Date();
    now.setDate(1);
    now.setHours(time.hours, time.minutes, time.seconds);
    return now.toLocaleTimeString("ru", {
      day: "numeric",
      hours: "numeric",
      minutes: "numeric",
      seconds: "numeric",
    });
  } else {
    return "time must be an object!";
  }
};
const changeTime = {
  seconds: function setSecondsFunc(time, seconds) {
    if (isObject(time)) {
      return (time.seconds = +seconds);
    } else {
      return "time must be an object!";
    }
  },
  minutes: function setMinutesFunc(time, minutes) {
    if (isObject(time)) {
      return (time.minutes = +minutes);
    } else {
      return "time must be an object!";
    }
  },
  hours: function setHoursFunc(time, hours) {
    if (isObject(time)) {
      return (time.hours = +hours);
    } else {
      return "time must be an object!";
    }
  },
};
console.log(showTime(time));
console.log(`Plus ${changeTime?.seconds(time, 120)} seconds`);
console.log(showTime(time));
console.log(`-------------`);
console.log(showTime(time));
console.log(`Plus ${changeTime?.minutes(time, 12)} minutes`);
console.log(showTime(time));
console.log(`-------------`);
console.log(showTime(time));
console.log(`Plus ${changeTime?.hours(time, 120)} Hours`);
console.log(showTime(time));
console.log(`-------------`);
