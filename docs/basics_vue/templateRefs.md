---
title: Template Refs в Vue 3
description: Руководство по использованию Template Refs для прямого доступа к DOM-элементам в Vue 3
---

# Template Refs в Vue 3

## 1. Что такое Template Refs

Template Refs (шаблонные ссылки) - это механизм во Vue 3, который позволяет получить прямой доступ к DOM-элементам или дочерним компонентам, объявленным в шаблоне. Это полезно, когда необходимо взаимодействовать с DOM-элементами напрямую, например, для фокусировки полей ввода, анимаций или интеграции со сторонними библиотеками.

## 2. Использование в Composition API

### Базовое использование

```vue
<script setup>
import { ref, onMounted } from 'vue';

// Создание ref для хранения ссылки на DOM-элемент
const inputRef = ref(null);

// После монтирования компонента можно получить доступ к DOM-элементу
onMounted(() => {
  // Прямой доступ к DOM-элементу
  inputRef.value.focus();
});
</script>

<template>
  <!-- Атрибут ref связывает DOM-элемент с переменной inputRef -->
  <input ref="inputRef" type="text" placeholder="Это поле получит фокус автоматически" />
</template>
```

### Доступ к нескольким элементам

```vue
<script setup>
import { ref, onMounted } from 'vue';

// Для массива элементов используем массив или объект
const itemRefs = ref([]);

onMounted(() => {
  // Теперь у нас есть массив DOM-элементов
  console.log(itemRefs.value.length);
  
  // Можно работать с каждым элементом
  itemRefs.value.forEach((item, index) => {
    console.log(`Элемент ${index}:`, item);
  });
});
</script>

<template>
  <ul>
    <li v-for="(item, index) in ['Первый', 'Второй', 'Третий']" :key="index"
        ref="itemRefs">
      {{ item }} элемент
    </li>
  </ul>
</template>
```

## 3. Refs для компонентов

### Доступ к методам и свойствам дочернего компонента

```vue
<!-- ParentComponent.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import ChildComponent from './ChildComponent.vue';

const childRef = ref(null);

onMounted(() => {
  // Доступ к методам дочернего компонента
  childRef.value.reset();
  
  // Доступ к публичным свойствам экземпляра
  console.log(childRef.value.publicData);
});

function activateChild() {
  childRef.value.activate();
}
</script>

<template>
  <button @click="activateChild">Активировать дочерний компонент</button>
  <ChildComponent ref="childRef" />
</template>
```

```vue
<!-- ChildComponent.vue -->
<script setup>
import { ref } from 'vue';

const isActive = ref(false);
const publicData = ref('Данные из дочернего компонента');

// Определение методов, которые будут доступны через ref
function reset() {
  isActive.value = false;
}

function activate() {
  isActive.value = true;
}

// Экспорт публичных методов и свойств
defineExpose({
  reset,
  activate,
  publicData
});
</script>

<template>
  <div :class="{ active: isActive }">
    Дочерний компонент
  </div>
</template>
```

## 4. Typescript с Template Refs

### Типизация DOM-элементов

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Типизация HTML-элемента
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (inputRef.value) {
    // TypeScript понимает, что это HTMLInputElement
    inputRef.value.focus();
    
    // Доступ к специфическим свойствам элемента input
    console.log(inputRef.value.value);
    console.log(inputRef.value.type);
  }
});
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
```

### Типизация компонентов

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CustomForm from './CustomForm.vue';

// Импорт типа для компонента (определенного в самом компоненте)
import type { CustomFormExpose } from './types';

// Типизация ссылки на компонент
const formRef = ref<CustomFormExpose | null>(null);

function submitForm() {
  if (formRef.value) {
    // TypeScript знает о методах, определенных в CustomFormExpose
    const isValid = formRef.value.validate();
    
    if (isValid) {
      formRef.value.submit();
    }
  }
}
</script>

<template>
  <CustomForm ref="formRef" />
  <button @click="submitForm">Отправить форму</button>
</template>
```

## 5. Работа с ref в callback функциях

```vue
<script setup>
import { ref, onMounted } from 'vue';

const containerRef = ref(null);

function setupObserver() {
  if (!containerRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Элемент виден в области просмотра');
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(containerRef.value);

  // Очистка наблюдателя при размонтировании компонента
  return () => observer.disconnect();
}

onMounted(setupObserver);
</script>

<template>
  <div ref="containerRef" class="container">
    <p>Этот контейнер отслеживается IntersectionObserver</p>
  </div>
</template>
```

## 6. Интеграция со сторонними библиотеками

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  if (!chartRef.value) return;

  // Предположим, что мы используем Chart.js
  chartInstance = new Chart(chartRef.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Январь', 'Февраль', 'Март'],
      datasets: [{
        label: 'Продажи',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
});

onBeforeUnmount(() => {
  // Очистка ресурсов при уничтожении компонента
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<template>
  <canvas ref="chartRef" width="400" height="200"></canvas>
</template>
```

## 7. Функциональный подход с шаблонными ссылками

```vue
<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const inputRef = ref(null);
const counter = ref(0);

// watchEffect для автоматического отслеживания зависимостей
watchEffect(() => {
  // Это будет выполняться при каждом изменении counter
  // или при первоначальной установке inputRef
  if (inputRef.value) {
    inputRef.value.dataset.counter = counter.value;
  }
}, { flush: 'post' }); // 'post' гарантирует, что DOM уже обновлен

function increment() {
  counter.value++;
}
</script>

<template>
  <input ref="inputRef" type="text" />
  <button @click="increment">Увеличить счетчик ({{ counter }})</button>
</template>
```

Template Refs предоставляют мощный механизм для взаимодействия с DOM-элементами, сохраняя при этом основные преимущества реактивной модели Vue. Используйте их, когда вам необходимо выйти за рамки декларативного подхода и получить прямой доступ к элементам.