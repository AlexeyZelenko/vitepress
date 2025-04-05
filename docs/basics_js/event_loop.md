---
title: Event Loop в JavaScript
description: Подробное объяснение работы Event Loop и асинхронного выполнения кода
---

# Event Loop в JavaScript

## 1. Что такое Event Loop?

Event Loop (цикл событий) - это механизм, который позволяет JavaScript выполнять неблокирующие операции, несмотря на то, что JavaScript является однопоточным языком.

### Основные компоненты
```javascript
// Event Loop работает с несколькими ключевыми компонентами:
// 1. Call Stack (стек вызовов)
// 2. Web APIs (в браузере) или C++ APIs (в Node.js)
// 3. Callback Queue (очередь колбэков)
// 4. Microtask Queue (очередь микрозадач)

// Пример синхронного кода
function main() {
  console.log('1');
  console.log('2');
  console.log('3');
}

main();
// Вывод: 1, 2, 3 (последовательно)
```

## 2. Call Stack

### Принцип работы стека вызовов
```javascript
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(result);
}

printSquare(4);
// Call Stack формируется так:
// 1. printSquare(4)
// 2. square(4)
// 3. multiply(4, 4)
// 4. console.log(16)
```

## 3. Макрозадачи (Tasks)

### setTimeout и setInterval
```javascript
console.log('Начало');

setTimeout(() => {
  console.log('Таймер 1');
}, 0);

setTimeout(() => {
  console.log('Таймер 2');
}, 0);

console.log('Конец');

// Вывод:
// Начало
// Конец
// Таймер 1
// Таймер 2
```

## 4. Микрозадачи (Microtasks)

### Promise и queueMicrotask
```javascript
console.log('Начало');

Promise.resolve().then(() => {
  console.log('Микрозадача 1');
});

queueMicrotask(() => {
  console.log('Микрозадача 2');
});

setTimeout(() => {
  console.log('Макрозадача');
}, 0);

console.log('Конец');

// Вывод:
// Начало
// Конец
// Микрозадача 1
// Микрозадача 2
// Макрозадача
```

## 5. Порядок выполнения

### Приоритеты задач
```javascript
console.log('Скрипт начался');

setTimeout(() => {
  console.log('setTimeout 1');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    setTimeout(() => {
      console.log('setTimeout 2');
    }, 0);
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('Скрипт закончился');

// Вывод:
// Скрипт начался
// Скрипт закончился
// Promise 1
// Promise 2
// setTimeout 1
// setTimeout 2
```

## 6. Практические примеры

### Обработка событий
```javascript
button.addEventListener('click', () => {
  Promise.resolve().then(() => {
    console.log('Микрозадача в обработчике события');
  });
  
  console.log('Обработчик события');
});

// При клике:
// Обработчик события
// Микрозадача в обработчике события
```

### Асинхронные операции
```javascript
async function example() {
  console.log('1');
  
  setTimeout(() => {
    console.log('2');
  }, 0);
  
  await Promise.resolve();
  console.log('3');
  
  new Promise(resolve => {
    console.log('4');
    resolve();
  }).then(() => {
    console.log('5');
  });
  
  console.log('6');
}

example();
console.log('7');

// Вывод:
// 1
// 7
// 3
// 4
// 6
// 5
// 2
```

## 7. Node.js Event Loop

### Фазы цикла событий в Node.js
```javascript
// 1. timers: setTimeout, setInterval
setTimeout(() => console.log('timer'), 0);

// 2. pending callbacks: I/O операции
fs.readFile('file.txt', () => console.log('file read'));

// 3. idle, prepare: внутреннее использование

// 4. poll: получение новых I/O событий

// 5. check: setImmediate
setImmediate(() => console.log('immediate'));

// 6. close callbacks: socket.on('close', ...)
```

## 8. Отладка и понимание

### Визуализация Event Loop
```javascript
console.log('1'); // Синхронный код

setTimeout(() => {
  console.log('2'); // Макрозадача
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3'); // Микрозадача
    setTimeout(() => {
      console.log('4'); // Новая макрозадача
    }, 0);
  })
  .then(() => {
    console.log('5'); // Микрозадача
  });

console.log('6'); // Синхронный код

// Порядок выполнения:
// 1. Синхронный код: 1, 6
// 2. Микрозадачи: 3, 5
// 3. Макрозадачи: 2, 4
```

## 9. Лучшие практики

### Оптимизация производительности
```javascript
// Плохо: блокировка Event Loop
function heavyOperation() {
  for (let i = 0; i < 1000000000; i++) {
    // Тяжелые вычисления
  }
}

// Хорошо: разбиение на части
function chunkedOperation(start = 0, end = 1000000000, chunk = 1000000) {
  return new Promise(resolve => {
    if (start >= end) {
      resolve();
      return;
    }
    
    setTimeout(() => {
      for (let i = start; i < Math.min(start + chunk, end); i++) {
        // Часть вычислений
      }
      chunkedOperation(start + chunk, end, chunk).then(resolve);
    }, 0);
  });
}
```