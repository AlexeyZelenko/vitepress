---
title: События в JavaScript
description: Подробное руководство по работе с событиями
---

# События в JavaScript

## 1. Типы событий

### События мыши
```javascript
// Клик
element.addEventListener('click', () => {});

// Двойной клик
element.addEventListener('dblclick', () => {});

// Наведение
element.addEventListener('mouseover', () => {});
element.addEventListener('mouseout', () => {});

// Перемещение
element.addEventListener('mousemove', (event) => {
  console.log(event.clientX, event.clientY);
});
```

### События клавиатуры
```javascript
// Нажатие клавиши
document.addEventListener('keydown', (event) => {
  console.log(event.key, event.code);
});

// Отпускание клавиши
document.addEventListener('keyup', (event) => {});

// Ввод текста
input.addEventListener('input', (event) => {
  console.log(event.target.value);
});
```

## 2. Объект события

### Свойства события
```javascript
element.addEventListener('click', (event) => {
  // Координаты относительно окна
  console.log(event.clientX, event.clientY);
  
  // Координаты относительно документа
  console.log(event.pageX, event.pageY);
  
  // Целевой элемент
  console.log(event.target);
  
  // Текущий элемент (где сработал обработчик)
  console.log(event.currentTarget);
});
```

## 3. Всплытие и погружение

### Фазы события
```javascript
// Погружение (capturing)
element.addEventListener('click', () => {}, true);

// Всплытие (bubbling)
element.addEventListener('click', () => {}, false); // по умолчанию

// Остановка всплытия
element.addEventListener('click', (event) => {
  event.stopPropagation();
});
```

## 4. Пользовательские события

### Создание и отправка событий
```javascript
// Создание события
const event = new CustomEvent('myEvent', {
  detail: { message: 'Привет!' }
});

// Отправка события
element.dispatchEvent(event);

// Прослушивание пользовательского события
element.addEventListener('myEvent', (event) => {
  console.log(event.detail.message);
});
```