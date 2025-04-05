---
title: Composables во Vue 3
description: Руководство по созданию и использованию composables в Vue 3
---

# Composables во Vue 3

## 1. Что такое Composables?

Composables - это функции, которые инкапсулируют и переиспользуют логику состояния в Vue 3 компонентах.

## 2. Создание Composable

### Базовый пример
```typescript
// useCounter.ts
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return {
    count,
    double,
    increment,
    decrement
  };
}
```

## 3. Работа с жизненным циклом

### Использование хуков
```typescript
import { onMounted, onUnmounted, ref } from 'vue';

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(e: MouseEvent) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return { x, y };
}
```

## 4. Асинхронные Composables

### Работа с API
```typescript
import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  async function fetchData() {
    loading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    error,
    loading,
    fetchData
  };
}
```

## 5. Composables с состоянием

### Управление состоянием
```typescript
import { reactive, computed } from 'vue';

export function useCart() {
  const state = reactive({
    items: [] as Array<{ id: number; name: string; price: number }>
  });

  const total = computed(() => {
    return state.items.reduce((sum, item) => sum + item.price, 0);
  });

  function addItem(item: { id: number; name: string; price: number }) {
    state.items.push(item);
  }

  function removeItem(id: number) {
    const index = state.items.findIndex(item => item.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  }

  return {
    items: state.items,
    total,
    addItem,
    removeItem
  };
}
```

## 6. Composables с параметрами

### Настраиваемые Composables
```typescript
import { ref, watch } from 'vue';

export function useStorage<T>(key: string, defaultValue: T) {
  const storedValue = ref<T>(
    JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue))
  );

  watch(storedValue, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  return storedValue;
}
```

## 7. Комбинирование Composables

### Создание сложных Composables
```typescript
export function useUserProfile(userId: string) {
  const { data: user, loading: userLoading } = useFetch(`/api/users/${userId}`);
  const { data: posts, loading: postsLoading } = useFetch(`/api/users/${userId}/posts`);
  const { storedPreferences } = useStorage(`user-${userId}-prefs`, {});

  const isLoading = computed(() => userLoading.value || postsLoading.value);

  return {
    user,
    posts,
    storedPreferences,
    isLoading
  };
}
```

## 8. Лучшие практики

### Правила и рекомендации
```typescript
// ✅ Хорошо: Чёткое именование
export function useUserAuthentication() {
  // ...
}

// ✅ Хорошо: Возврат объекта с именованными значениями
export function useTimer() {
  const time = ref(0);
  return { time, start, stop, reset };
}

// ✅ Хорошо: Документация TypeScript
interface UseSearchOptions {
  immediate?: boolean;
  limit?: number;
}

export function useSearch(options?: UseSearchOptions) {
  // ...
}
```