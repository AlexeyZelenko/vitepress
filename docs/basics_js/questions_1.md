---
title: Часто задаваемые вопросы на собеседованиях по JavaScript
description: Подборка популярных вопросов и задач на собеседованиях с подробными ответами и примерами кода
---

# Часто задаваемые вопросы на собеседованиях по JavaScript

## 1. Типы данных и проверка типов

### Вопрос: В чем разница между `==` и `===`?

```javascript
// Нестрогое сравнение (==)
console.log(5 == "5");      // true
console.log(0 == false);    // true
console.log(null == undefined);  // true

// Строгое сравнение (===)
console.log(5 === "5");     // false
console.log(0 === false);   // false
console.log(null === undefined);  // false
```

**Объяснение**:
- `==` выполняет приведение типов перед сравнением
- `===` сравнивает значения без приведения типов

### Вопрос: Как проверить, является ли переменная массивом?

```javascript
// Способ 1: Array.isArray()
const arr = [1, 2, 3];
console.log(Array.isArray(arr));  // true
console.log(Array.isArray({}));   // false

// Способ 2: instanceof
console.log(arr instanceof Array);  // true

// Способ 3: Object.prototype.toString.call()
console.log(Object.prototype.toString.call(arr) === '[object Array]');  // true
```

## 2. Замыкания и область видимости

### Вопрос: Что выведет следующий код?

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}

// Решение с использованием let
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);  // Выведет 0, 1, 2, 3, 4
    }, 1000);
}

// Решение с использованием замыкания
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j);  // Выведет 0, 1, 2, 3, 4
        }, 1000);
    })(i);
}
```

**Объяснение**:
- При использовании `var` все итерации будут ссылаться на последнее значение `i`
- `let` создает блочную область видимости
- Немедленно вызываемая функция создает замыкание для каждой итерации

## 3. Прототипы и наследование

### Вопрос: Реализуйте наследование без использования `class`

```javascript
// Функция-конструктор
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} издает звук`);
};

// Наследование
function Dog(name, breed) {
    Animal.call(this, name);  // Вызов родительского конструктора
    this.breed = breed;
}

// Установка прототипа
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Переопределение метода
Dog.prototype.speak = function() {
    console.log(`${this.name} лает`);
};

const dog = new Dog('Шарик', 'Овчарка');
dog.speak();  // "Шарик лает"
```

## 4. Асинхронное программирование

### Вопрос: Реализуйте функцию последовательного выполнения промисов

```javascript
function sequentialPromises(promises) {
    return promises.reduce((chain, promise) => {
        return chain.then(result => 
            promise.then(value => [...result, value])
        );
    }, Promise.resolve([]));
}

// Пример использования
const promise1 = () => new Promise(resolve => setTimeout(() => resolve(1), 1000));
const promise2 = () => new Promise(resolve => setTimeout(() => resolve(2), 500));
const promise3 = () => new Promise(resolve => setTimeout(() => resolve(3), 100));

sequentialPromises([promise1, promise2, promise3])
    .then(console.log);  // [1, 2, 3]
```

### Вопрос: Реализуйте функцию `Promise.all` с нуля

```javascript
function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Аргумент должен быть массивом'));
        }

        const results = new Array(promises.length);
        let completedPromises = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completedPromises++;

                    if (completedPromises === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });

        if (promises.length === 0) {
            resolve(results);
        }
    });
}

// Пример использования
const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

customPromiseAll(promises)
    .then(console.log);  // [1, 2, 3]
```

## 5. Работа с объектами

### Вопрос: Глубокое клонирование объекта

```javascript
function deepClone(obj) {
    // Обработка примитивов и null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Обработка Date
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // Обработка массивов
    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }

    // Обработка объектов
    const clone = {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}

// Пример использования
const original = {
    a: 1,
    b: [1, 2, 3],
    c: { d: 4 },
    e: new Date()
};

const cloned = deepClone(original);
console.log(cloned !== original);  // true
```

## 6. Функциональное программирование

### Вопрос: Реализуйте каррирование функции

```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            }
        }
    };
}

// Пример использования
function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));    // 6
console.log(curriedSum(1, 2)(3));    // 6
console.log(curriedSum(1)(2, 3));    // 6
console.log(curriedSum(1, 2, 3));    // 6
```

## 7. Производительность и оптимизация

### Вопрос: Напишите функцию мемоизации

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Пример использования
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.time('Без мемоизации');
fibonacci(35);
console.timeEnd('Без мемоизации');

console.time('С мемоизацией');
memoizedFibonacci(35);
console.timeEnd('С мемоизацией');
```

## Заключение

Советы для подготовки к собеседованию:
- Изучайте основы языка глубоко
- Практикуйте решение задач на платформах вроде LeetCode
- Понимайте, как работают механизмы языка "под капотом"
- Умейте объяснить свое решение
- Не бойтесь признаваться, что чего-то не знаете

---
Удачи на собеседовании!