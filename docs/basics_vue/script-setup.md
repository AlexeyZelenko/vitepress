---
title: Script Setup в Vue 3
description: Руководство по использованию Script Setup синтаксиса в Vue 3
---

# Script Setup в Vue 3

## 1. Основы Script Setup

### Базовый синтаксис
```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

## 2. Определение пропсов

### Типизированные пропсы
```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = defineProps<Props>();
</script>
```

### С значениями по умолчанию
```vue
<script setup lang="ts">
interface Props {
  title?: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title',
  count: 0
});
</script>
```

## 3. События

### Определение событий
```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'delete', id: number): void;
}>();

const handleUpdate = () => {
  emit('update', 'new value');
};
</script>
```

## 4. Слоты

### Типизированные слоты
```vue
<script setup lang="ts">
interface HeaderSlotProps {
  title: string;
}

defineSlots<{
  header: (props: HeaderSlotProps) => any;
  default: () => any;
}>();
</script>

<template>
  <div>
    <slot name="header" :title="'Hello'"></slot>
    <slot></slot>
  </div>
</template>
```

## 5. Expose

### Экспорт методов и свойств
```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;

// Делаем доступными для родительского компонента
defineExpose({
  count,
  increment
});
</script>
```

## 6. Async Components

### Асинхронные компоненты
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
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

## 7. Composables

### Использование композиционной логики
```vue
<script setup>
import { useCounter } from './composables/counter';
import { useTheme } from './composables/theme';

const { count, increment } = useCounter();
const { theme, toggleTheme } = useTheme();
</script>
```

## 8. Директивы

### Пользовательские директивы
```vue
<script setup>
const vFocus = {
  mounted: (el) => el.focus()
};

const vColor = (el, binding) => {
  el.style.color = binding.value;
};
</script>

<template>
  <input v-focus />
  <p v-color="'red'">Colored text</p>
</template>
```