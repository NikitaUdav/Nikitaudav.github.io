"use strict";
const classes = [
  {
    name: "ЕЕ-101",
    amount: 20,
    facName: "Інститут електромеханіки, енергозбереження і систем управління",
  },
  {
    name: "ІТ-403",
    amount: 50,
    facName: "Навчально-науковий інститут механіки і транспорту",
  },
  {
    name: "МТ-402",
    amount: 49,
    facName: "Навчально-науковий інститут механіки і транспорту",
  },
  {
    name: "МТ-390",
    amount: 56,
    facName: "Навчально-науковий інститут механіки і транспорту",
  },
  {
    name: "МТ-25",
    amount: 25,
    facName: "Факультет електроніки та комп'ютерної інженерії",
  },
  { name: "ЕІ-90", amount: 30, facName: "Факультет економіки і управління" },
  {
    name: "ПГС-41",
    amount: 40,
    facName: "Факультет права, гуманітарних і соціальних наук",
  },
];

const logClass = ({ name }, idx) => {
  console.log(`${idx + 1}. ${name}`);
};

const showClasses = () => {
  console.log("Classes:");
  classes.forEach(logClass);
};

const showClassesByFacName = (inputFacName) => {
  const fac = classes.find((item) =>
    item.facName.toLowerCase().includes(inputFacName.toLowerCase())
  );
  if (fac) {
    console.log(`Аудиторії - ${fac.facName}`);
    classes.filter(({ facName }) => fac.facName === facName).forEach(logClass);
  } else {
    console.log(`Факультут не знайдено!`);
  }
};

const findClassesForStudents = ({ name, amount, facName }) => {
  const findFn = (item) => {
    return (
      item.amount >= amount &&
      item.facName.toLowerCase().includes(facName.toLowerCase())
    );
  };
  if (classes.some(findFn)) {
    console.log(`Знайдені аудиторіі для группи ${name}`);
    classes.filter(findFn).forEach(logClass);
  } else {
    console.log(`Аудиторії для группи ${name} не знайдено`);
  }
};

const sortClassesByAmount = () => {
  console.log(`Аудиторії по кількості місць`);
  classes
    .sort((a, b) => a.amount - b.amount)
    .forEach(({ name, amount }, idx) =>
      console.log(`${idx + 1}. ${name} -${amount}`)
    );
};

const sortClassesByName = () => {
  console.log(`Аудиторії за назвою`);
  classes
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .forEach(logClass);
};

showClasses();
showClassesByFacName("механіки і транспорту");
showClassesByFacName("економіки і управління");
showClassesByFacName("Криміналістики");
findClassesForStudents({
  name: "КР-1020",
  amount: 40,
  facName: "механіки і транспорту",
});
findClassesForStudents({
  name: "КР-1120",
  amount: 70,
  facName: "механіки і транспорту",
});
findClassesForStudents({
  name: "КР-1220",
  amount: 20,
  facName: "механіки і транспорту",
});
findClassesForStudents({
  name: "КР-1320",
  amount: 30,
  facName: "Криміналістики",
});
sortClassesByAmount();
sortClassesByName();
