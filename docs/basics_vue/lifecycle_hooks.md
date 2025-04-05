---
title: Жизненные хуки Vue 3
description: Разбор жизненного цикла компонентов Vue 3 с интерактивными примерами и практическими кейсами.
---

import CounterExample from '../../components/CounterExample.vue';

# Жизненные хуки Vue 3

Vue 3 предоставляет мощные хуки, которые позволяют реагировать на изменения в жизненном цикле компонента. Эти хуки помогают управлять состоянием, оптимизировать рендеринг и выполнять побочные эффекты.

## Основные хуки жизненного цикла

### `onBeforeMount` — Перед монтированием
Вызывается перед тем, как компонент будет добавлен в DOM.

```javascript
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  console.log('Компонент скоро будет смонтирован!');
});
```

### `onMounted` — После монтирования
Вызывается, когда компонент добавляется в DOM. Отлично подходит для загрузки данных или работы с API.

```javascript
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Компонент смонтирован!');
});
```

### `onBeforeUpdate` — Перед обновлением
Вызывается перед тем, как компонент обновится.

```javascript
import { onBeforeUpdate } from 'vue';

onBeforeUpdate(() => {
  console.log('Компонент скоро обновится!');
});
```

### `onUpdated` — После обновления
Вызывается после обновления компонента.

```javascript
import { onUpdated } from 'vue';

onUpdated(() => {
  console.log('Компонент обновился!');
});
```

### `onBeforeUnmount` — Перед уничтожением
Вызывается перед удалением компонента из DOM.

```javascript
import { onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
  console.log('Компонент скоро будет удалён!');
});
```

### `onUnmounted` — После уничтожения
Вызывается сразу после удаления компонента.

```javascript
import { onUnmounted } from 'vue';

onUnmounted(() => {
  console.log('Компонент уничтожен!');
});
```

### `onErrorCaptured` — Обработка ошибок
Позволяет отлавливать ошибки, возникающие в дочерних компонентах.

```javascript
import { onErrorCaptured } from 'vue';

onErrorCaptured((err, instance, info) => {
  console.error('Ошибка в компоненте:', err, info);
  return false; // предотвращает всплытие ошибки
});
```

### `onRenderTracked` — Отслеживание реактивности
Вызывается при отслеживании реактивных зависимостей во время рендеринга.

```javascript
import { onRenderTracked } from 'vue';

onRenderTracked((event) => {
  console.log('Отслеживание рендеринга:', event);
});
```

### `onRenderTriggered` — Срабатывание реактивности
Вызывается, когда реактивные зависимости вызывают повторный рендеринг.

```javascript
import { onRenderTriggered } from 'vue';

onRenderTriggered((event) => {
  console.log('Повторный рендеринг из-за:', event);
});
```

### `onActivated` / `onDeactivated` — Динамические компоненты
Используются при работе с `keep-alive`, чтобы реагировать на активацию/деактивацию компонента.

```javascript
import { onActivated, onDeactivated } from 'vue';

onActivated(() => {
  console.log('Компонент активирован!');
});

onDeactivated(() => {
  console.log('Компонент деактивирован!');
});
```

## Интерактивный пример

Попробуйте изменить значение и посмотрите в консоли, как срабатывают хуки:

<CounterExample client:load />


## Вывод

Жизненные хуки Vue 3 позволяют эффективно управлять компонентами, выполняя код в нужные моменты их жизненного цикла. Используйте их для оптимизации производительности и работы с побочными эффектами. 🚀