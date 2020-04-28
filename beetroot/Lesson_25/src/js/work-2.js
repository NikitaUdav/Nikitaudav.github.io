"use strict";
const isObject = (obj) => typeof obj === "object";
const isString = (str) => typeof str === "string";

const a = {
  num: 3,
  den: 9,
};
const b = {
  num: 2,
  den: 3,
};

const fraction = {
  format: (fraction) => {
    if (isObject(fraction)) {
      return `${fraction.num}/${fraction.den}`;
    }
    return `Argument isn't a franction`;
  },
  divReduction(fraction, divider = 2) {
    const num = Number(fraction.num);
    const den = Number(fraction.den);
    if (!(num % divider) && !(den % divider)) {
      return this.divReduction({
        num: num / divider,
        den: den / divider,
      });
    }
    return fraction;
  },

  commonDenominator: (a, b) => {
    if (isObject(a) && isObject(b)) {
      const denMax = Math.max(a.den, b.den);
      const denMin = Math.min(a.den, b.den);
      let den = denMax;
      if (denMax % denMin) {
        den = denMax * denMin;
      }
      return `${(a = a.num * (den / a.den))},${(b =
        b.num * (den / b.den))},${den}`;
    } else {
      return "a & b must be an object!";
    }
  },
  sum: function (first, second) {
    let args = fraction.commonDenominator(first, second).split(",");
    const result = Number(args[0]) + Number(args[1]);
    return {
      num: result,
      den: args[2],
    };
  },
  difference: function (first, second) {
    let args = fraction.commonDenominator(first, second).split(",");
    const result = Number(args[0]) - Number(args[1]);
    return {
      num: result,
      den: args[2],
    };
  },
  multiplication: function (first, second) {
    if (isObject(a) && isObject(b)) {
      return {
        num: a.num * b.num,
        den: a.den * b.den,
      };
    } else {
      return "a & b must be an object!";
    }
  },
  division: function (first, second) {
    if (isObject(a) && isObject(b)) {
      return {
        num: a.num * b.den,
        den: a.den * b.num,
      };
    } else {
      return "a & b must be an object!";
    }
  },
  reduction(fraction) {
    if (isObject(fraction)) {
      const num = Number(fraction.num);
      const den = Number(fraction.den);
      const max = Math.max(num, den);
      const min = Math.min(num, den);
      if (!(max % min)) {
        return { num: num / min, den: den / min };
      }
      return this.divReduction(this.divReduction(fraction, 2), 3);
    } else {
      return "Argument isn't a fraction";
    }
  },
};

let sum = fraction.multiplication(a, b);
console.log("MUT: ", sum, fraction.format(sum));
let reduction = fraction.reduction(sum);
console.log("RED: ", reduction, fraction.format(reduction));

sum = fraction.difference(a, b);
console.log("DIF: ", sum, fraction.format(sum));
reduction = fraction.reduction(sum);
console.log("RED: ", reduction, fraction.format(reduction));

sum = fraction.division(a, b);
console.log("DIV: ", sum, fraction.format(sum));
reduction = fraction.reduction(sum);
console.log("RED: ", reduction, fraction.format(reduction));
