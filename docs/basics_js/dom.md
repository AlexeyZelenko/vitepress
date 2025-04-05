---
title: Работа с DOM
description: Руководство по манипуляции с DOM в JavaScript
---

# Работа с DOM в JavaScript

## 1. Выбор элементов

### Основные методы выбора
```javascript
// Выбор по ID
const element = document.getElementById('myId');

// Выбор по классу
const elements = document.getElementsByClassName('myClass');

// Выбор по тегу
const divs = document.getElementsByTagName('div');

// Современные методы
const element = document.querySelector('.myClass'); // первый элемент
const elements = document.querySelectorAll('.myClass'); // все элементы
```

## 2. Манипуляция элементами

### Создание элементов
```javascript
// Создание нового элемента
const div = document.createElement('div');
div.className = 'myClass';
div.textContent = 'Новый элемент';

// Добавление в DOM
parentElement.appendChild(div);
```

### Изменение содержимого
```javascript
// Текстовое содержимое
element.textContent = 'Новый текст';

// HTML содержимое
element.innerHTML = '<span>HTML контент</span>';
```

## 3. Работа с атрибутами

### Управление атрибутами
```javascript
// Установка атрибута
element.setAttribute('data-id', '123');

// Получение атрибута
const value = element.getAttribute('data-id');

// Проверка наличия атрибута
const hasAttribute = element.hasAttribute('data-id');

// Удаление атрибута
element.removeAttribute('data-id');
```

## 4. События

### Добавление обработчиков событий
```javascript
// Современный способ
element.addEventListener('click', (event) => {
  console.log('Клик!', event);
});

// Удаление обработчика
const handler = (event) => console.log('Клик!');
element.addEventListener('click', handler);
element.removeEventListener('click', handler);
```

### Делегирование событий
```javascript
document.getElementById('parent').addEventListener('click', (event) => {
  if (event.target.matches('.child')) {
    console.log('Клик по дочернему элементу');
  }
});
```