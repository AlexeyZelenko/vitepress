---
title: Компоненты Vue 3
description: Руководство по созданию и использованию компонентов в Vue 3
---

# Компоненты в Vue 3

## 1. Создание компонентов

### Базовый компонент
```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    Счётчик: {{ count }}
  </button>
</template>
```

### Пропсы
```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Значение: {{ count }}</p>
  </div>
</template>
```

## 2. События

### Эмиты событий
```vue
<script setup>
const emit = defineEmits(['update', 'delete']);

function handleUpdate() {
  emit('update', { id: 1, value: 'new data' });
}

function handleDelete() {
  emit('delete', 1);
}
</script>

<template>
  <div>
    <button @click="handleUpdate">Обновить</button>
    <button @click="handleDelete">Удалить</button>
  </div>
</template>
```

## 3. Слоты

### Базовые слоты
```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent>
    <template #header>
      <h1>Заголовок</h1>
    </template>
    <template #default>
      <p>Основной контент</p>
    </template>
    <template #footer>
      <p>Подвал</p>
    </template>
  </ChildComponent>
</template>

<!-- ChildComponent.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

## 4. Композиция компонентов

### Переиспользование логики
```javascript
// useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return {
    count,
    double,
    increment
  };
}

// CounterComponent.vue
<script setup>
import { useCounter } from './useCounter';

const { count, double, increment } = useCounter(10);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

## 5. Динамические компоненты

### component и keep-alive
```vue
<script setup>
import { ref } from 'vue';
import TabOne from './TabOne.vue';
import TabTwo from './TabTwo.vue';

const currentTab = ref('TabOne');
const tabs = {
  TabOne,
  TabTwo
};
</script>

<template>
  <div>
    <button 
      v-for="(_, name) in tabs" 
      :key="name"
      @click="currentTab = name"
    >
      {{ name }}
    </button>

    <keep-alive>
      <component :is="tabs[currentTab]" />
    </keep-alive>
  </div>
</template>
```

## 6. Асинхронные компоненты

### Загрузка по требованию
```vue
<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
);
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Загрузка...</div>
    </template>
  </Suspense>
</template>
```

## 7. Передача данных

### Provide/Inject
```vue
<!-- ParentComponent.vue -->
<script setup>
import { provide, ref } from 'vue';

const theme = ref('light');
provide('theme', theme);
</script>

<!-- ChildComponent.vue -->
<script setup>
import { inject } from 'vue';

const theme = inject('theme', 'light'); // Значение по умолчанию
</script>
```

## 8. Директивы

### Пользовательские директивы
```vue
<script setup>
// Директива для автофокуса
const vFocus = {
  mounted: (el) => el.focus()
};
</script>

<template>
  <input v-focus type="text" />
</template>
```