---
title: Composition API в Vue 3
description: Подробное руководство по использованию Composition API
---

# Composition API в Vue 3

## 1. Основы Composition API

### Setup-функция
```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
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
}
```

## 2. Реактивность

### ref
Для примитивных значений:
```javascript
import { ref } from 'vue';

const count = ref(0);
console.log(count.value); // 0
count.value++;
```

### reactive
Для объектов:
```javascript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  }
});

state.count++; // Не требует .value
```

### computed
Вычисляемые свойства:
```javascript
import { ref, computed } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);
```

## 3. Жизненный цикл

### Хуки жизненного цикла
```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted
} from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('Компонент смонтирован');
    });

    onUpdated(() => {
      console.log('Компонент обновлен');
    });

    onUnmounted(() => {
      console.log('Компонент размонтирован');
    });
  }
}
```

## 4. Watch и WatchEffect

### watch
```javascript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`Значение изменилось с ${oldValue} на ${newValue}`);
});
```

### watchEffect
```javascript
import { ref, watchEffect } from 'vue';

const count = ref(0);
const name = ref('John');

watchEffect(() => {
  console.log(`Count: ${count.value}, Name: ${name.value}`);
});
```

## 5. Provide/Inject

### Передача данных через уровни компонентов
```javascript
import { provide, inject } from 'vue';

// В родительском компоненте
provide('key', 'value');

// В дочернем компоненте
const value = inject('key');
```

## 6. Script Setup

### Современный синтаксис
```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    Count: {{ count }}, Double: {{ double }}
  </button>
</template>
```

## 7. Composables

### Переиспользуемая логика
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

// Использование
import { useCounter } from './useCounter';

const { count, double, increment } = useCounter(10);
```