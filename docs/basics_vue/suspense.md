---
title: Suspense во Vue 3
description: Руководство по использованию Suspense для асинхронных компонентов
---

# Suspense во Vue 3

## 1. Основы Suspense

Suspense - это встроенный компонент Vue 3, который позволяет управлять асинхронными зависимостями в дереве компонентов.

### Базовое использование
```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
);
</script>
```

## 2. Асинхронные компоненты

### Компонент с async setup
```vue
<script setup>
// AsyncComponent.vue
const res = await fetch('https://api.example.com/data');
const data = await res.json();
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
```

## 3. Обработка ошибок

### Использование errorCaptured
```vue
<script setup>
import { onErrorCaptured, ref } from 'vue';

const error = ref(null);

onErrorCaptured((e) => {
  error.value = e;
  return false; // Предотвращаем всплытие ошибки
});
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>

  <div v-if="error" class="error">
    {{ error.message }}
  </div>
</template>
```

## 4. Вложенные Suspense

### Управление несколькими асинхронными компонентами
```vue
<template>
  <Suspense>
    <template #default>
      <div>
        <AsyncComponent1 />
        <Suspense>
          <template #default>
            <AsyncComponent2 />
          </template>
          <template #fallback>
            <p>Loading nested component...</p>
          </template>
        </Suspense>
      </div>
    </template>
    <template #fallback>
      <p>Loading main content...</p>
    </template>
  </Suspense>
</template>
```

## 5. Практические примеры

### Загрузка данных пользователя
```vue
<script setup>
// UserProfile.vue
const props = defineProps(['userId']);

const userData = await fetchUserData(props.userId);
const userPosts = await fetchUserPosts(props.userId);
</script>

<template>
  <div class="user-profile">
    <h2>{{ userData.name }}</h2>
    <div class="posts">
      <article v-for="post in userPosts" :key="post.id">
        {{ post.title }}
      </article>
    </div>
  </div>
</template>

// Parent.vue
<template>
  <Suspense>
    <template #default>
      <UserProfile :userId="123" />
    </template>
    <template #fallback>
      <div class="loading">
        <LoadingSpinner />
        <p>Loading user profile...</p>
      </div>
    </template>
  </Suspense>
</template>
```

### Динамическая загрузка компонентов
```vue
<script setup>
import { ref, defineAsyncComponent } from 'vue';

const tabs = {
  profile: defineAsyncComponent(() => import('./UserProfile.vue')),
  settings: defineAsyncComponent(() => import('./UserSettings.vue')),
  activity: defineAsyncComponent(() => import('./UserActivity.vue'))
};

const currentTab = ref('profile');
const CurrentComponent = computed(() => tabs[currentTab.value]);
</script>

<template>
  <div class="tabs">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
  </div>

  <Suspense>
    <template #default>
      <component :is="CurrentComponent" />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>
```

## 6. Лучшие практики

### Оптимизация производительности
```vue
<script setup>
// Используйте defineAsyncComponent с опциями
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
});
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <LoadingPlaceholder />
    </template>
  </Suspense>
</template>
```

### Обработка состояний загрузки
```vue
<script setup>
import { ref } from 'vue';

const isLoading = ref(true);
const error = ref(null);

onErrorCaptured((e) => {
  error.value = e;
  return false;
});

// Отслеживание завершения загрузки
onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div class="async-component">
    <Suspense>
      <template #default>
        <AsyncContent />
      </template>
      <template #fallback>
        <div class="loading-state">
          <LoadingSpinner />
          <p>{{ isLoading ? 'Loading...' : 'Content ready' }}</p>
        </div>
      </template>
    </Suspense>

    <div v-if="error" class="error-state">
      <ErrorIcon />
      <p>{{ error.message }}</p>
      <button @click="retryLoad">Retry</button>
    </div>
  </div>
</template>
```