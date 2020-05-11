const homeTask = {
  // info Подсчитать сумму всех чисел в заданном пользователем диапазоне.
  task1: function (first, second) {
    const min = Math.min(first, second);
    const max = Math.max(first, second);
    let result = 0;
    for (let i = min; i <= max; i++) {
      result += i;
      console.log(`i = ${i}`);
      console.log(`result = ${result}`);
    }
  },
  // info Запросить 2 числа и найти только наибольший общий делитель.
  task2: function () {
    if (arguments.length === 2) {
      if (arguments[1] === 0) return arguments[0];
      else return homeTask.task2(arguments[1], arguments[0] % arguments[1]);
    }
  },
  // Запросить у пользователя число и вывести все делители этого числа.
  task3: function () {
    let number = prompt();
    if (isNaN(number)) {
      console.log(`Not a number`);
    } else {
      for (let i = 1; i < number; i++) {
        if (number % i === 0) {
          console.log(i);
        }
      }
    }
  },
  //Определить количество цифр в введенном числе.
  task4: function () {
    let number = prompt();
    if (isNaN(number)) {
      console.log(`Not a number`);
    } else {
      const arr = number.split("");
      console.log(arr.length);
    }
  },
  task5: function () {
    const statistics = {
      plus: 0,
      minus: 0,
      nulls: 0,
      chet: 0,
      nechet: 0,
      notNumber: 0,
    };
    for (let i = 0; i < 2; i++) {
      let number = prompt();
      if (isNaN(number)) {
        statistics.notNumber++;
      } else {
        number > 0
          ? statistics.plus++
          : number < 0
          ? statistics.minus++
          : statistics.nulls++;
        number % 2 === 0 ? statistics.chet++ : statistics.nechet++;
      }
    }
    for (let key in statistics) {
      console.log(`${key} = ${statistics[key]}`);
    }
  },
  //Зациклить калькулятор.
  //Запросить у пользователя 2 числа и знак,
  //решить пример, вывести результат и спросить,
  //хочет ли он решить еще один пример.
  //И так до тех пор, пока пользователь не откажется.
  task6: function () {
    alert(`Kalkulator`);
    let go = true;
    while (go) {
      let first = Number(prompt(`Первое число`));
      let second = Number(prompt(`Второе число`));
      if (isNaN(first) && isNaN(second)) {
        console.log(`not number`);
      } else {
        let action = prompt(`Введите оператор`);
        let result = 0;
        switch (action) {
          case "+":
            result = first + second;
            break;
          case "-":
            result = first - second;
            break;
          case "/":
            if (first === 0) {
              alert(`на ноль делить нельзя`);
            } else result = first / second;
            break;
          case "*":
            result = first * second;
            break;
          default:
            alert("Нет таких значений");
        }
        alert(`Ваш ответ =  ${result}`);
      }
      go = window.confirm(`Продолжаем ?`);
    }
  },
  //Запросить у пользователя число и на сколько цифр его сдвинуть.
  //Сдвинуть цифры числа и вывести результат
  //(если число 123456 сдвинуть на 2 цифры, то получится 345612).
  task7: function () {
    let number = prompt(`your number`, 123456).split("");
    let shift = prompt(`shift`, 2);
    if (isNaN(shift)) {
      shift = 0;
    }
    for (let i = 0; i < shift; i++) {
      number.push(number[0]);
      number.shift();
    }
    alert(`your shift number = ${number.join("")}`);
  },
  //Зациклить вывод дней недели таким образом: «День недели.
  //Хотите увидеть следующий день?»
  // и так до тех пор, пока пользователь нажимает OK.
  task8: function () {
    let go = true;
    const weekdays = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    let day = new Date();
    day = day.getDay();
    while (go) {
      go = window.confirm(
        `Сегодня ${weekdays[day]} Хотите увидеть следующий день?`
      );
      day < 6 ? (day += 1) : (day = 0);
      console.log(day);
    }
  },
  task9: function () {
    let result = 1;
    for (let i = 1; i <= 10; i++) {
      for (let y = 1; y <= 10; y++) {
        result = i * y;
        console.log(`${i} * ${y} = ${result}`);
        result = 0;
      }
    }
  },
  task10: function () {
    let question = (number) => {
      let input;
      do {
        input = prompt(`Ваше число > ${number}, < ${number} или = ${number}?`);
      } while (input !== ">" && input !== "<" && input !== "=");
      return input;
    };

    let guessNumber = () => {
      let numb = 100;
      alert(`Загадайте число от 1 до ${numb}.`);
      numb /= 2;
      let m = numb;
      let input = question(numb);
      while (input !== `=`) {
        m /= 2;
        if (input === `>`) {
          numb = numb + +m.toFixed();
        } else {
          numb = numb - +m.toFixed();
        }
        input = question(numb);
      }
      alert(`Конец`);
    };
    guessNumber();
  },
};
//homeTask.task10();
