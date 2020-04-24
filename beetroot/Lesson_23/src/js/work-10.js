"use strict";
const inputDay = prompt("Enter a day");
const inputMonth = prompt("Enter a month");
const inputYear = prompt("Enter a year");
const date = new Date(
  Number(inputYear),
  Number(inputMonth - 1),
  Number(inputDay) + 1
);
alert(
  date.toLocaleString("ru", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  })
);
