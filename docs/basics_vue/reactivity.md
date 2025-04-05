---
title: Реактивность в Vue 3
description: Подробное объяснение системы реактивности Vue 3
---

# Реактивность в Vue 3

## 1. Основы реактивности

### ref
```javascript
import { ref } from 'vue';

const count = ref(0);
console.log(count.value); // 0

// Изменение значения
count.value++;
```

### reactive
```javascript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: {
    name: 'John'
  }
});

// Прямой доступ к свойствам
state.count++;
state.user.name = 'Jane';
```

## 2. Вычисляемые свойства

### computed
```javascript
import { ref, computed } from 'vue';

const count = ref(0);

// Только для чтения
const double = computed(() => count.value * 2);

// С возможностью записи
const doubleWritable = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.value = val / 2;
  }
});
```

## 3. Отслеживание изменений

### watch
```javascript
import { ref, watch } from 'vue';

const count = ref(0);

// Простое отслеживание
watch(count, (newValue, oldValue) => {
  console.log(`Изменение с ${oldValue} на ${newValue}`);
});

// Отслеживание нескольких источников
const name = ref('John');
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`Count: ${oldCount} -> ${newCount}`);
  console.log(`Name: ${oldName} -> ${newName}`);
});
```

### watchEffect
```javascript
import { ref, watchEffect } from 'vue';

const count = ref(0);
const name = ref('John');

watchEffect(() => {
  console.log(`Count is ${count.value} and name is ${name.value}`);
});
```

## 4. Преобразование реактивности

### toRef и toRefs
```javascript
import { reactive, toRef, toRefs } from 'vue';

const state = reactive({
  count: 0,
  name: 'John'
});

// Создание отдельной ref-ссылки
const countRef = toRef(state, 'count');

// Преобразование всего объекта
const stateRefs = toRefs(state);
const { count, name } = stateRefs;
```

### unref
```javascript
import { ref, unref } from 'vue';

const count = ref(0);
console.log(unref(count)); // 0

const plainNumber = 42;
console.log(unref(plainNumber)); // 42
```

## 5. Реактивные утилиты

### isRef, isReactive, isReadonly
```javascript
import { ref, reactive, readonly, isRef, isReactive, isReadonly } from 'vue';

const count = ref(0);
const state = reactive({});
const readOnlyState = readonly({});

console.log(isRef(count)); // true
console.log(isReactive(state)); // true
console.log(isReadonly(readOnlyState)); // true
```

### shallowRef и shallowReactive
```javascript
import { shallowRef, shallowReactive } from 'vue';

// Поверхностная реактивность
const state = shallowRef({ count: 0 });
const obj = shallowReactive({ nested: { count: 0 } });
```

## 6. Примеры использования

### Форма с реактивными данными
```javascript
import { reactive, computed } from 'vue';

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const isValid = computed(() => {
  return form.password === form.confirmPassword &&
         form.password.length >= 6 &&
         form.username.length >= 3;
});

function submit() {
  if (isValid.value) {
    // Отправка формы
  }
}
```

### Счетчик с историей
```javascript
import { ref, reactive, watch } from 'vue';

const count = ref(0);
const history = reactive({
  changes: []
});

watch(count, (newVal, oldVal) => {
  history.changes.push({
    from: oldVal,
    to: newVal,
    timestamp: new Date()
  });
});
```