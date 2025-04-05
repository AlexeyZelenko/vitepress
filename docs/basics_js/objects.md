---
title: Объекты в JavaScript
description: Подробное руководство по работе с объектами в JavaScript
---

# Шпаргалка по объектам в JavaScript

## 1. Создание объектов

### Литеральная нотация
```javascript
const person = {
  name: "Иван",
  age: 30,
  job: "программист"
};
```

### Через конструктор Object
```javascript
const person = new Object();
person.name = "Иван";
person.age = 30;
person.job = "программист";
```

### Через конструктор-функцию
```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
const ivan = new Person("Иван", 30, "программист");
```

### Через Object.create()
```javascript
const personProto = {
  greeting: function() {
    return `Привет, меня зовут ${this.name}`;
  }
};
const ivan = Object.create(personProto);
ivan.name = "Иван";
```

## 2. Методы объектов

### Добавление методов
```javascript
const person = {
  name: "Иван",
  sayHello() {
    return `Привет, я ${this.name}!`;
  }
};
```

### Геттеры и сеттеры
```javascript
const person = {
  firstName: "Иван",
  lastName: "Петров",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  }
};
```

## 3. Работа со свойствами

### Проверка существования свойства
```javascript
const person = { name: "Иван" };

// Оператор in
console.log("name" in person); // true

// hasOwnProperty
console.log(person.hasOwnProperty("name")); // true
```

### Удаление свойств
```javascript
const person = { name: "Иван", age: 30 };
delete person.age;
```

### Перебор свойств
```javascript
const person = { name: "Иван", age: 30, job: "программист" };

// for...in
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// Object.keys()
Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});
```