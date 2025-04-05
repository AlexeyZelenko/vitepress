---
title: Массивы в JavaScript
description: Основные концепции и методы работы с массивами
---

# Руководство по массивам в JavaScript

## 1. Создание массивов

### Литеральная нотация
```javascript
const fruits = ["яблоко", "банан", "апельсин"];
```

### Конструктор Array
```javascript
const numbers = new Array(1, 2, 3, 4, 5);
```

## 2. Основные методы

### Добавление и удаление элементов
```javascript
const arr = ["один"];

// Добавление в конец
arr.push("два");              // ["один", "два"]

// Добавление в начало
arr.unshift("ноль");         // ["ноль", "один", "два"]

// Удаление с конца
const last = arr.pop();      // ["ноль", "один"]

// Удаление с начала
const first = arr.shift();   // ["один"]
```

### Поиск элементов
```javascript
const numbers = [1, 2, 3, 4, 5];

// indexOf - поиск индекса элемента
console.log(numbers.indexOf(3));    // 2

// includes - проверка наличия элемента
console.log(numbers.includes(6));   // false

// find - поиск элемента по условию
const found = numbers.find(num => num > 3);  // 4
```

### Преобразование массивов
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - создание нового массива с измененными элементами
const doubled = numbers.map(num => num * 2);  // [2, 4, 6, 8, 10]

// filter - фильтрация элементов
const evenNumbers = numbers.filter(num => num % 2 === 0);  // [2, 4]

// reduce - сведение массива к одному значению
const sum = numbers.reduce((acc, curr) => acc + curr, 0);  // 15
```

## 3. Сортировка и обработка

### Сортировка массива
```javascript
const fruits = ["яблоко", "банан", "апельсин"];

// Простая сортировка
fruits.sort();  // ["апельсин", "банан", "яблоко"]

// Сортировка с функцией сравнения
const numbers = [10, 5, 8, 1, 3];
numbers.sort((a, b) => a - b);  // [1, 3, 5, 8, 10]
```

### Объединение и разделение
```javascript
// Объединение массивов
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);  // [1, 2, 3, 4]

// Разделение массива
const numbers = [1, 2, 3, 4, 5];
const slice = numbers.slice(1, 3);  // [2, 3]
```