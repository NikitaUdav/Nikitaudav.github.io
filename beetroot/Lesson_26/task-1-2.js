"use strict";
const shopList = [
  {
    name: "potatoes",
    count: 1,
    price: 20,
    bought: 0,
  },
  {
    name: "banana",
    count: 1,
    price: 10,
    bought: 0,
  },
  {
    name: "kivi",
    count: 1,
    price: 40,
    bought: 1,
  },
  {
    name: "aple",
    count: 1,
    price: 5,
    bought: 1,
  },
  {
    name: "water",
    count: 1,
    price: 2,
    bought: 1,
  },
];
const shopFunc = {
  showList: function () {
    shopList.sort(function (a, b) {
      if (a.bought > b.bought) {
        return -1;
      }
      return shopList;
    });
    let result = "";
    for (let i = 0; i < shopList.length; i++) {
      for (let key in shopList[i]) {
        result = result + key + ": " + shopList[i][key] + "\n";
      }
      result = result + "\n";
    }
    return result;
  },
  addProduct: function (name, count = 1, price = 1) {
    if (typeof name !== "string" || isNaN(count) || count < 0 || isNaN(price)) {
      return `List not change`;
    } else {
      let addFlag = 1;
      for (let i = 0; i < shopList.length; i++) {
        if (shopList[i].name === name) {
          shopList[i].count = shopList[i].count + count;
          addFlag = 0;
        }
      }
      if (addFlag) {
        shopList.push({
          name: name,
          count: count,
          price: price,
          bought: 0,
        });
      }
    }
  },
  boughtProducts: function (name) {
    if (typeof name !== "string") {
      console.log(`List not change`);
    } else {
      for (let i = 0; i < shopList.length; i++) {
        if (shopList[i].name === name) {
          shopList[i].bought++;
        }
      }
    }
  },
  printСheck: function () {
    let check = 0;
    let mostExpensive = [0, ""];
    let message = "";
    for (let i = 0; i < shopList.length; i++) {
      let purchase = 0;
      if (shopList[i].bought) {
        message =
          message +
          `${shopList[i].name} = ${shopList[i].price} * ${shopList[i].count}` +
          "\n";
        check += Number(shopList[i].price * shopList[i].count);
        purchase += Number(shopList[i].price * shopList[i].count);
      }
      if (mostExpensive[0] < purchase) {
        mostExpensive[0] = purchase;
        mostExpensive[1] = `The most expensive purchase : ${shopList[i].name} = ${shopList[i].price} * ${shopList[i].count}\n`;
      }
    }
    return `${message}\nTotal check = ${check}\n${mostExpensive[1]}Thanks for the purchase \n!!! Come again !!!`;
  },
};

shopFunc.addProduct("aple", 1);
shopFunc.addProduct("milk", 1, 5);
shopFunc.addProduct("melon", 4, 25);
shopFunc.boughtProducts("milk");
shopFunc.boughtProducts("melon");
console.log(shopFunc.showList());
console.log(shopFunc.printСheck());
