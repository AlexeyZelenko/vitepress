---
title: watchEffect в Vue 3
description: Подробное руководство по использованию watchEffect и других функций реактивного отслеживания в Vue 3
---

# watchEffect и системы отслеживания в Vue 3

## 1. Что такое watchEffect

`watchEffect` - это функция в Composition API Vue 3, которая отслеживает зависимости внутри переданного ей колбэка и автоматически перезапускает его при изменении любой из этих зависимостей. Это мощный инструмент для реактивных вычислений и побочных эффектов.

## 2. Основы watchEffect

### Базовое использование

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const count = ref(0);
const doubled = ref(0);

// watchEffect автоматически отслеживает зависимости
watchEffect(() => {
  // Колбэк запустится при изменении count
  doubled.value = count.value * 2;
  console.log(`Значение: ${count.value}, удвоенное значение: ${doubled.value}`);
});

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <p>Счётчик: {{ count }}</p>
    <p>Удвоенное значение: {{ doubled }}</p>
    <button @click="increment">Увеличить</button>
  </div>
</template>
```

### Особенности выполнения

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const count = ref(0);

// watchEffect запускается немедленно при создании
watchEffect(() => {
  console.log(`Текущее значение: ${count.value}`);
  // Автоматически отслеживает count
});

// Будет выведено "Текущее значение: 0" сразу после создания
</script>
```

## 3. Параметры watchEffect

### Тайминг выполнения (flush)

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const count = ref(0);
const element = ref(null);

// По умолчанию (pre) - запускается до обновления DOM
watchEffect(() => {
  console.log(`count изменился на: ${count.value}`);
});

// Post - запускается после обновления DOM
watchEffect(() => {
  if (element.value) {
    // DOM уже обновлен, работа с элементом безопасна
    element.value.textContent = `Значение: ${count.value}`;
  }
}, { flush: 'post' });

// Sync - запускается синхронно при изменении реактивного значения
watchEffect(() => {
  console.log(`Синхронно: ${count.value}`);
}, { flush: 'sync' });
</script>

<template>
  <div>
    <p ref="element"></p>
    <button @click="count++">Увеличить ({{ count }})</button>
  </div>
</template>
```

### Остановка наблюдателя

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const count = ref(0);

// watchEffect возвращает функцию остановки
const stop = watchEffect(() => {
  console.log(`Текущее значение: ${count.value}`);
});

// Остановить наблюдатель после 5 секунд
setTimeout(() => {
  stop();
  console.log('Наблюдатель остановлен');
  
  // Дальнейшие изменения count не приведут к вызову колбэка
  count.value++;
}, 5000);
</script>
```

## 4. Очистка побочных эффектов

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const id = ref(1);
const data = ref(null);

watchEffect((onCleanup) => {
  // Представим, что это запрос к API
  const controller = new AbortController();
  const { signal } = controller;
  
  // Запускаем асинхронную операцию
  fetchData(id.value, signal).then(result => {
    data.value = result;
  });
  
  // Регистрируем функцию очистки
  onCleanup(() => {
    // Отменяем запрос при изменении id или уничтожении компонента
    controller.abort();
    console.log('Запрос отменен');
  });
});

async function fetchData(id, signal) {
  // Имитация API-запроса
  return fetch(`https://api.example.com/data/${id}`, { signal })
    .then(response => response.json());
}
</script>
```

## 5. Сравнение с watch

### watch - явное указание источников

```vue
<script setup>
import { ref, watch } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');
const fullName = ref('');

// Явно указываем, что отслеживаем firstName и lastName
watch([firstName, lastName], ([newFirstName, newLastName]) => {
  fullName.value = `${newFirstName} ${newLastName}`;
});

// Колбэк вызывается только при изменении указанных источников
</script>
```

### watchEffect - автоматическое отслеживание

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');
const fullName = ref('');

// Автоматически отслеживает все используемые реактивные значения
watchEffect(() => {
  fullName.value = `${firstName.value} ${lastName.value}`;
});

// Колбэк вызывается сразу при создании и при любом изменении зависимостей
</script>
```

### Доступ к старым значениям

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);

// watch предоставляет доступ к старым и новым значениям
watch(count, (newValue, oldValue) => {
  console.log(`Изменено с ${oldValue} на ${newValue}`);
});

// watchEffect не имеет доступа к предыдущим значениям
watchEffect(() => {
  // Доступно только текущее значение
  console.log(`Текущее значение: ${count.value}`);
});
</script>
```

## 6. Глубокое отслеживание объектов

### watchEffect с вложенными свойствами

```vue
<script setup>
import { ref, reactive, watchEffect } from 'vue';

const user = reactive({
  name: 'John',
  address: {
    city: 'New York',
    country: 'USA'
  }
});

// Автоматически отслеживает все используемые свойства, включая вложенные
watchEffect(() => {
  console.log(`${user.name} живет в ${user.address.city}, ${user.address.country}`);
});

// При изменении любого из используемых свойств, колбэк будет перезапущен
setTimeout(() => {
  user.address.city = 'Boston';
}, 2000);
</script>
```

### Проблемы с новыми свойствами

```vue
<script setup>
import { reactive, watchEffect } from 'vue';

const user = reactive({
  name: 'John'
});

watchEffect(() => {
  // Это свойство существует при первом запуске
  console.log(`Имя: ${user.name}`);
  
  // Это свойство еще не существует при первом запуске
  if (user.age) {
    console.log(`Возраст: ${user.age}`);
  }
});

// Добавление нового свойства
setTimeout(() => {
  user.age = 30;
  // НЕ вызовет перезапуск watchEffect, если это свойство
  // не использовалось при первоначальном запуске
}, 1000);
</script>
```

## 7. Практические примеры

### Синхронизация с LocalStorage

```vue
<script setup>
import { ref, watchEffect } from 'vue';

// Загрузка начального значения из localStorage
const theme = ref(localStorage.getItem('theme') || 'light');

// Автоматическая синхронизация с localStorage
watchEffect(() => {
  localStorage.setItem('theme', theme.value);
  document.body.className = theme.value;
});

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>

<template>
  <button @click="toggleTheme">
    Переключить тему ({{ theme }})
  </button>
</template>
```

### Условное отслеживание

```vue
<script setup>
import { ref, computed, watchEffect } from 'vue';

const isActive = ref(false);
const count = ref(0);

// Создаем вычисляемое свойство для условного отслеживания
const activeCount = computed(() => {
  // Возвращаем count только если isActive === true
  return isActive.value ? count.value : null;
});

// Теперь watchEffect будет реагировать на изменения count
// только когда isActive === true
watchEffect(() => {
  const value = activeCount.value;
  if (value !== null) {
    console.log(`Активный счетчик: ${value}`);
  }
});

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <button @click="isActive = !isActive">
      {{ isActive ? 'Деактивировать' : 'Активировать' }} отслеживание
    </button>
    <button @click="increment">Увеличить ({{ count }})</button>
  </div>
</template>
```

### Дебаунс для API-запросов

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const searchQuery = ref('');
const searchResults = ref([]);
const isLoading = ref(false);

// Функция для создания дебаунсера
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Создаем дебаунсированную функцию поиска
const debouncedSearch = debounce(async (query) => {
  if (!query.trim()) {
    searchResults.value = [];
    return;
  }
  
  isLoading.value = true;
  try {
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    searchResults.value = await response.json();
  } catch (error) {
    console.error('Ошибка поиска:', error);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
}, 300);

// Используем watchEffect для отслеживания изменений поискового запроса
watchEffect(() => {
  const query = searchQuery.value;
  debouncedSearch(query);
});
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Поиск..." />
    <div v-if="isLoading">Загрузка...</div>
    <ul v-else>
      <li v-for="(result, index) in searchResults" :key="index">
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>
```

## 8. Типизация с TypeScript

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User | null>(null);

// Типизированная функция асинхронного запроса
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`https://api.example.com/users/${id}`);
  return response.json();
}

// watchEffect с обработкой ошибок
watchEffect(async (onCleanup) => {
  if (!user.value) {
    try {
      const controller = new AbortController();
      onCleanup(() => controller.abort());
      
      const fetchedUser = await fetchUser(1);
      user.value = fetchedUser;
    } catch (error) {
      console.error('Ошибка при загрузке пользователя:', error);
    }
  }
});
</script>
```

`watchEffect` - это мощный инструмент для реактивного программирования в Vue 3, который позволяет автоматически отслеживать зависимости и реагировать на их изменения. В отличие от `watch`, который требует явного указания отслеживаемых источников, `watchEffect` определяет зависимости динамически во время выполнения, что делает код более лаконичным и гибким.