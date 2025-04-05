---
title: Двусторонняя привязка с defineModel
description: Двусторонняя привязка с defineModel
---

# Двусторонняя привязка с defineModel

В Vue 3.4+ появился улучшенный способ работы с двусторонней привязкой данных через API `defineModel()`, который значительно упрощает создание компонентов с поддержкой `v-model`.

## Базовое использование

```vue
<!-- CustomInput.vue -->
<script setup>
// Создание двусторонней привязки
const modelValue = defineModel();
</script>

<template>
  <input 
    :value="modelValue"
    @input="modelValue = $event.target.value"
  />
</template>

<!-- Использование компонента -->
<script setup>
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';

const username = ref('');
</script>

<template>
  <CustomInput v-model="username" />
  <p>Введённое значение: {{ username }}</p>
</template>
```

## Настройка модели

```vue
<script setup>
// С проверкой и значением по умолчанию
const modelValue = defineModel({
  type: String,
  default: '',
  required: true,
  validator: (value) => value.length > 3
});
</script>
```

## Множественные модели

```vue
<!-- UserForm.vue -->
<script setup>
const firstName = defineModel('firstName');
const lastName = defineModel('lastName');
</script>

<template>
  <div>
    <input 
      :value="firstName"
      @input="firstName = $event.target.value"
      placeholder="Имя"
    />
    <input 
      :value="lastName"
      @input="lastName = $event.target.value"
      placeholder="Фамилия"
    />
  </div>
</template>

<!-- Использование компонента с множественными моделями -->
<script setup>
import { ref } from 'vue';
import UserForm from './UserForm.vue';

const first = ref('');
const last = ref('');
</script>

<template>
  <UserForm 
    v-model:firstName="first"
    v-model:lastName="last"
  />
  <p>Полное имя: {{ first }} {{ last }}</p>
</template>
```

## Модификаторы модели

```vue
<script setup>
// Доступ к модификатору .trim
const modelValue = defineModel({ 
  default: '' 
});

// Получение объекта модификаторов
const modelModifiers = defineModifiers();

// Проверка наличия модификатора
const hasTrimModifier = modelModifiers.trim;
</script>

<template>
  <input 
    :value="modelValue"
    @input="
      let value = $event.target.value;
      if (modelModifiers.trim) {
        value = value.trim();
      }
      modelValue = value;
    "
  />
</template>
```

Использование `defineModel` позволяет значительно сократить количество шаблонного кода по сравнению с традиционным подходом через `props` и `emit`, делая компоненты с двусторонней привязкой более читаемыми и поддерживаемыми.