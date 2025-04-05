---
title: Методы массивов в JavaScript
description: Основные методы работы с массивами и их краткое описание
---

# Руководство по методам массивов в JavaScript

## 1. Добавление и удаление элементов

::: details
### push()
Добавляет один или несколько элементов в конец массива.
```javascript
const arr = [1, 2];
arr.push(3, 4); // [1, 2, 3, 4]
```

### pop()
Удаляет последний элемент массива и возвращает его.
```javascript
const arr = [1, 2, 3];
arr.pop(); // 3
console.log(arr); // [1, 2]
```

### shift()
Удаляет первый элемент массива и возвращает его.
```javascript
const arr = [1, 2, 3];
arr.shift(); // 1
console.log(arr); // [2, 3]
```

### unshift()
Добавляет один или несколько элементов в начало массива.
```javascript
const arr = [2, 3];
arr.unshift(0, 1); // [0, 1, 2, 3]
```
:::


## 2. Обход массива

::: details
### forEach()
Выполняет указанную функцию для каждого элемента массива.
```javascript
const arr = [1, 2, 3];
arr.forEach(num => console.log(num * 2)); // 2, 4, 6
```
:::

## 3. Трансформация массива

::: details
### map()
Создаёт новый массив, применяя функцию к каждому элементу.
```javascript
const arr = [1, 2, 3];
const doubled = arr.map(num => num * 2); // [2, 4, 6]
```

### filter()
Создаёт новый массив, содержащий только элементы, соответствующие условию.
```javascript
const arr = [1, 2, 3, 4];
const even = arr.filter(num => num % 2 === 0); // [2, 4]
```

### reduce()
Применяет функцию к элементам массива, сводя его к одному значению.
```javascript
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, num) => acc + num, 0); // 10
```

### structuredClone()
Глубокое клонирование массива или объекта.
```javascript
const original = [{ a: 1 }, { b: 2 }];
const clone = structuredClone(original);
clone[0].a = 42;
console.log(original[0].a); // 1
console.log(clone[0].a); // 42
```

Глубокое клонирование массива или объекта.
:::

## 4. Поиск элементов
::: details
### find()
Возвращает первый элемент, удовлетворяющий условию.
```javascript
const arr = [1, 2, 3, 4];
const found = arr.find(num => num > 2); // 3
```

### findIndex()
Возвращает индекс первого элемента, удовлетворяющего условию.
```javascript
const arr = [1, 2, 3, 4];
const index = arr.findIndex(num => num > 2); // 2
```

### includes()
Проверяет, содержит ли массив определённое значение.
```javascript
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true
```

:::

## 5. Изменение структуры массива
::: details
### slice()
Создаёт новый массив, содержащий часть исходного массива.
```javascript
const arr = [1, 2, 3, 4];
const newArr = arr.slice(1, 3); // [2, 3]
```

### splice()
Удаляет, заменяет или добавляет элементы в массив.
```javascript
const arr = [1, 2, 3, 4];
arr.splice(1, 2, "a", "b"); // [1, "a", "b", 4]
```

### concat()
Объединяет два или более массивов в один.
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2); // [1, 2, 3, 4]
```
:::

## 6. Преобразование массива в строку
::: details
### join()
Объединяет элементы массива в строку через указанный разделитель.
```javascript
const arr = ["a", "b", "c"];
const str = arr.join("-"); // "a-b-c"
```

### toString()
Преобразует массив в строку (эквивалент `join(",")`).
```javascript
const arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"
```

:::

---
Эта шпаргалка поможет быстро вспомнить основные методы работы с массивами!

