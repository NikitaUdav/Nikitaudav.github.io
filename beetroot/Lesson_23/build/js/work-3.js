!(function (n) {
  "function" == typeof define && define.amd ? define("work3", n) : n();
})(function () {
  "use strict";
  var n = prompt("Укажите число для проверки совпадения");
  isNaN(n)
    ? alert("Биджо ты написал не число! Давай все сначала !")
    : n[0] === n[1] && null != n[0] && null != n[1]
    ? alert("В этом числе есть одинаковые числа и это ".concat(n[0]))
    : n[1] === n[2] && null != n[1] && null != n[2]
    ? alert("В этом числе есть одинаковые числа и это ".concat(n[1]))
    : n[0] === n[2] && null != n[0] && null != n[2]
    ? alert("В этом числе есть одинаковые числа и это ".concat(n[2]))
    : alert("В этом числе нет одинаковых чисел");
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay0zLmpzIiwic291cmNlcyI6WyJzcmMvanMvd29yay0zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3QgbnVtYmVyID0gcHJvbXB0KGDQo9C60LDQttC40YLQtSDRh9C40YHQu9C+INC00LvRjyDQv9GA0L7QstC10YDQutC4INGB0L7QstC/0LDQtNC10L3QuNGPYCk7XG5pZiAoaXNOYU4obnVtYmVyKSkge1xuICBhbGVydChg0JHQuNC00LbQviDRgtGLINC90LDQv9C40YHQsNC7INC90LUg0YfQuNGB0LvQviEg0JTQsNCy0LDQuSDQstGB0LUg0YHQvdCw0YfQsNC70LAgIWApO1xufSBlbHNlIHtcbiAgaWYgKFxuICAgIG51bWJlclswXSA9PT0gbnVtYmVyWzFdICYmXG4gICAgbnVtYmVyWzBdICE9IHVuZGVmaW5lZCAmJlxuICAgIG51bWJlclsxXSAhPSB1bmRlZmluZWRcbiAgKSB7XG4gICAgYWxlcnQoYNCSINGN0YLQvtC8INGH0LjRgdC70LUg0LXRgdGC0Ywg0L7QtNC40L3QsNC60L7QstGL0LUg0YfQuNGB0LvQsCDQuCDRjdGC0L4gJHtudW1iZXJbMF19YCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgbnVtYmVyWzFdID09PSBudW1iZXJbMl0gJiZcbiAgICBudW1iZXJbMV0gIT0gdW5kZWZpbmVkICYmXG4gICAgbnVtYmVyWzJdICE9IHVuZGVmaW5lZFxuICApIHtcbiAgICBhbGVydChg0JIg0Y3RgtC+0Lwg0YfQuNGB0LvQtSDQtdGB0YLRjCDQvtC00LjQvdCw0LrQvtCy0YvQtSDRh9C40YHQu9CwINC4INGN0YLQviAke251bWJlclsxXX1gKTtcbiAgfSBlbHNlIGlmIChcbiAgICBudW1iZXJbMF0gPT09IG51bWJlclsyXSAmJlxuICAgIG51bWJlclswXSAhPSB1bmRlZmluZWQgJiZcbiAgICBudW1iZXJbMl0gIT0gdW5kZWZpbmVkXG4gICkge1xuICAgIGFsZXJ0KGDQkiDRjdGC0L7QvCDRh9C40YHQu9C1INC10YHRgtGMINC+0LTQuNC90LDQutC+0LLRi9C1INGH0LjRgdC70LAg0Lgg0Y3RgtC+ICR7bnVtYmVyWzJdfWApO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KGDQkiDRjdGC0L7QvCDRh9C40YHQu9C1INC90LXRgiDQvtC00LjQvdCw0LrQvtCy0YvRhSDRh9C40YHQtdC7YCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJudW1iZXIiLCJwcm9tcHQiLCJpc05hTiIsImFsZXJ0IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoibUdBQ0EsSUFBTUEsRUFBU0MsZ0RBQ1hDLE1BQU1GLEdBQ1JHLHdEQUdFSCxFQUFPLEtBQU9BLEVBQU8sSUFDUkksTUFBYkosRUFBTyxJQUNNSSxNQUFiSixFQUFPLEdBRVBHLHlEQUFrREgsRUFBTyxLQUV6REEsRUFBTyxLQUFPQSxFQUFPLElBQ1JJLE1BQWJKLEVBQU8sSUFDTUksTUFBYkosRUFBTyxHQUVQRyx5REFBa0RILEVBQU8sS0FFekRBLEVBQU8sS0FBT0EsRUFBTyxJQUNSSSxNQUFiSixFQUFPLElBQ01JLE1BQWJKLEVBQU8sR0FFUEcseURBQWtESCxFQUFPLEtBRXpERyJ9
