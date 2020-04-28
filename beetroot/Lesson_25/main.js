"use strict";
const car = {
  manufacturer: "Tesla",
  model: "X",
  yeaManufacture: 2019,
  averageSpeed: 350,
};
const car2 = {
  manufacturer: "BMW",
  model: "X5",
  yeaManufacture: 2016,
  averageSpeed: 300,
};
const carShow = function CarShowFunc(obj, key = 1) {
  if (typeof obj === "object") {
    console.log(`Производитель ${obj?.manufacturer}`);
    console.log(`Модель ${obj?.model}`);
    console.log(`Год производства ${obj?.yeaManufacture}`);
    console.log(`Средняя скорость ${obj?.averageSpeed}`);
  } else return `Is not object`;
};
//carShow(car2);
const travelTime = function travelTimeFunc(distance = 1, car) {
  if (typeof car === "object" && typeof distance !== "string") {
    const result = distance / car.averageSpeed;
    return result.toFixed(2);
  } else return `error`;
};
const di = "ee";
console.log(travelTime(di, car2));
