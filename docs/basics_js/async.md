---
title: Асинхронное программирование в JavaScript
description: Основные концепции Асинхронного программирования в JavaScript
---

# Асинхронное программирование в JavaScript

## 1. Колбэки (Callbacks)

### Базовое использование
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Данные получены');
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

### Обработка ошибок
```javascript
function fetchData(success, error) {
  const random = Math.random();
  setTimeout(() => {
    if (random > 0.5) {
      success('Данные получены');
    } else {
      error('Ошибка получения данных');
    }
  }, 1000);
}
```

## 2. Промисы (Promises)

### Создание промисов
```javascript
const promise = new Promise((resolve, reject) => {
  const random = Math.random();
  setTimeout(() => {
    if (random > 0.5) {
      resolve('Успех!');
    } else {
      reject('Ошибка!');
    }
  }, 1000);
});
```

### Цепочки промисов
```javascript
fetchUser(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchPostComments(posts[0].id))
  .catch(error => console.error(error));
```

### Методы Promise

#### `Promise.all`
Выполняет массив промисов параллельно и возвращает массив результатов. Если хотя бы один промис завершится с ошибкой, весь `Promise.all` завершится с этой ошибкой.

```javascript
const promises = [
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
];

Promise.all(promises)
  .then(([users, posts, comments]) => {
    console.log('Все данные:', { users, posts, comments });
  })
  .catch(error => {
    console.error('Ошибка в одном из промисов:', error);
  });
```

#### `Promise.race`
Возвращает результат первого завершенного промиса (независимо от того, успешно он выполнился или с ошибкой).

```javascript
const promises = [
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
];

Promise.race(promises)
  .then(data => {
    console.log('Первый завершенный промис:', data);
  })
  .catch(error => {
    console.error('Первый завершенный промис с ошибкой:', error);
  });
```

#### `Promise.allSettled`
Ждет завершения всех промисов и возвращает массив объектов с результатами (как успешными, так и ошибочными).

```javascript
const promises = [
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Промис ${index} успешно завершен:`, result.value);
      } else {
        console.error(`Промис ${index} завершен с ошибкой:`, result.reason);
      }
    });
  });
```

#### `Promise.any`
Возвращает результат первого успешно завершенного промиса. Если все промисы завершатся с ошибкой, вернется `AggregateError`.

```javascript
const promises = [
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
];

Promise.any(promises)
  .then(data => {
    console.log('Первый успешный промис:', data);
  })
  .catch(error => {
    console.error('Все промисы завершились с ошибкой:', error);
  });
```

## 3. Async/Await

### Основы async/await
```javascript
async function fetchUserData() {
  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
```

### Параллельное выполнение
```javascript
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}
```
