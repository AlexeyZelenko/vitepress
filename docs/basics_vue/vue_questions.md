---
sidebar_position: 1
title: Вопросы по Vue 3
description: Вопросы по Vue 3 для подготовки к собеседованию
keywords: ['vue', 'vue3', 'interview', 'questions', 'собеседование', 'интервью', 'вопросы']
tags: ['vue', 'vue3', 'interview', 'questions', 'собеседование', 'интервью', 'вопросы']
---

# Вопросы по Vue 3

Каким будет вывод?

## Вопрос № 1

```js
import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({ count: 0 })

function updateValues() {
    count = 1
    state.count = 1
    console.log(count.value, state.count)
}

updateValues()
```

- A: `1` и `1`
- B: `Error` и `1`
- C: `0` и `1`
- D: `Error` и `Error`

::: details Ответ
<div>
<h4>Правильный ответ: <Badge type="warning" text="B" /></h4>

В Vue 3 реактивность достигается с помощью функций `ref` и `reactive`. Когда мы создаем реактивную переменную с помощью `ref`, мы получаем объект, а не примитивное значение. Чтобы изменить или получить значение, нужно использовать свойство `.value`.

В данном примере мы пытаемся присвоить значение непосредственно переменной `count`, а не ее свойству `.value`. Это вызывает ошибку, потому что мы пытаемся изменить константу.

Правильный способ изменения значения:
```js
count.value = 1
```

Для объекта `state`, созданного с помощью `reactive`, мы правильно изменяем свойство `count`, поэтому его значение успешно обновляется до `1`.

</div>
:::

## Вопрос № 2

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  console.log(`Count: ${count.value}`)
})

count.value++
count.value++
```

- A: `Count: 0` один раз
- B: `Count: 0`, `Count: 1`, `Count: 2`
- C: `Count: 0`, `Count: 2`
- D: `Count: 2` один раз

::: details Ответ
<div>
<h4>Правильный ответ: C</h4>

`watchEffect` - это функция Vue 3, которая отслеживает зависимости внутри своего колбэка и автоматически перезапускается при их изменении.

Когда `watchEffect` регистрируется, он выполняется немедленно, выводя начальное значение `count`, равное `0`.

Затем мы дважды увеличиваем значение `count`, но Vue выполняет обновления асинхронно и объединяет несколько изменений в одно обновление для оптимизации производительности. Поэтому `watchEffect` срабатывает только еще раз, после обоих изменений, когда `count.value` уже равно `2`.

Если бы изменения были разделены асинхронными операциями (например, с помощью `setTimeout`), то мы бы увидели три вызова.

</div>
:::

## Вопрос № 3

```js
import { reactive, toRefs } from 'vue'

const state = reactive({
  name: 'John',
  age: 30
})

const { name, age } = toRefs(state)

state.name = 'Jane'
console.log(name.value, age.value)
```

- A: `John` и `30`
- B: `Jane` и `30`
- C: `undefined` и `undefined`
- D: `John` и `Error`

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

Функция `toRefs` в Vue 3 преобразует реактивный объект в обычный объект, где каждое свойство становится ref, указывающим на соответствующее свойство исходного объекта.

Когда мы используем деструктуризацию с `toRefs`, мы получаем отдельные ref-объекты для каждого свойства, которые сохраняют реактивную связь с исходным объектом `state`.

После изменения `state.name` на `'Jane'`, значение `name.value` также становится `'Jane'`, так как они связаны. Значение `age.value` остается `30`, так как оно не изменялось.

Это один из способов сохранить реактивность при деструктуризации объектов в Vue 3.

</div>
:::

## Вопрос № 4

```js
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

count.value = 2
doubleCount.value = 10
console.log(count.value, doubleCount.value)
```

- A: `2` и `4`
- B: `2` и `10`
- C: `5` и `10`
- D: `2` и `4` с предупреждением

::: details Ответ
<div>
<h4>Правильный ответ: D</h4>

`computed` в Vue 3 создает вычисляемое значение, которое автоматически обновляется при изменении его зависимостей. По умолчанию вычисляемые значения доступны только для чтения.

Когда мы установили `count.value = 2`, значение `doubleCount` автоматически пересчиталось и стало равным `4`.

Попытка установить значение `doubleCount.value = 10` приведет к предупреждению в консоли, так как мы пытаемся изменить значение доступного только для чтения вычисляемого свойства. Эта операция игнорируется, и значение `doubleCount` остается `4`.

Если нам нужно создать вычисляемое свойство, которое можно изменять, мы должны использовать объект с геттером и сеттером:

```js
const doubleCount = computed({
  get: () => count.value * 2,
  set: (val) => { count.value = val / 2 }
})
```

</div>
:::

## Вопрос № 5

```js
import { reactive } from 'vue'

const original = { count: 0 }
const copy = { ...reactive(original) }

original.count = 1
console.log(copy.count)
```

- A: `0`
- B: `1`
- C: `undefined`
- D: `Error`

::: details Ответ
<div>
<h4>Правильный ответ: A</h4>

В Vue 3 реактивность не передается при создании копии объекта через оператор расширения (`...`).

Когда мы создаем `reactive(original)`, мы получаем реактивный прокси-объект. Однако, когда мы используем оператор расширения `{ ...reactive(original) }`, мы создаем новый объект с теми же свойствами, но без реактивности.

После этого `copy` становится обычным объектом, не связанным с `original`. Поэтому при изменении `original.count`, значение `copy.count` остается `0`.

Чтобы сохранить реактивность, следует использовать вложенные реактивные объекты или функцию `toRefs`.

</div>
:::

## Вопрос № 6

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`${oldValue} -> ${newValue}`)
}, { immediate: true })

count.value = 1
```

- A: `0 -> 1`
- B: `undefined -> 0` и `0 -> 1`
- C: `0 -> 0` и `0 -> 1`
- D: `0 -> 1` и `1 -> 1`

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

Функция `watch` в Vue 3 позволяет наблюдать за изменениями реактивных данных и выполнять побочные эффекты.

Опция `{ immediate: true }` заставляет колбэк выполниться немедленно при создании наблюдателя, до любых изменений. В этом случае `oldValue` будет `undefined`, поскольку это первый вызов, а `newValue` будет текущим значением `count`, то есть `0`.

После изменения `count.value = 1` колбэк выполнится снова, на этот раз `oldValue` будет `0`, а `newValue` будет `1`.

Таким образом, будут следующие вызовы:
1. `undefined -> 0` (из-за `immediate: true`)
2. `0 -> 1` (после `count.value = 1`)

</div>
:::

## Вопрос № 7

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    
    function increment() {
      count.value++
    }
    
    return { count, increment }
  },
  data() {
    return {
      count: 10
    }
  },
  methods: {
    increment() {
      this.count += 10
    }
  },
  mounted() {
    console.log(this.count)
    this.increment()
    console.log(this.count)
  }
})
```

- A: `0` и `1`
- B: `10` и `11`
- C: `10` и `20`
- D: `0` и `10`

::: details Ответ
<div>
<h4>Правильный ответ: C</h4>

В Vue 3 Composition API (`setup`) и Options API (традиционный подход с использованием `data`, `methods` и т.д.) могут использоваться вместе, но если они определяют одни и те же свойства или методы, приоритет имеет Options API.

В данном примере:
1. Функция `setup` возвращает объект с реактивным свойством `count` (значение `0`) и методом `increment`.
2. В `data` определяется свойство `count` со значением `10`.
3. В `methods` определяется метод `increment`.

Так как `data` и `methods` имеют приоритет над возвращаемыми значениями из `setup`, при обращении к `this.count` в хуке `mounted` мы получаем значение `10` из объекта `data`, а при вызове `this.increment()` выполняется метод из объекта `methods`, который увеличивает значение `count` на `10`.

Поэтому вывод будет `10` и `20`.

</div>
:::

## Вопрос № 8

```js
import { defineComponent, provide, inject } from 'vue'

const Child = defineComponent({
  setup() {
    const message = inject('message', 'default')
    console.log(`Child received: ${message}`)
    return {}
  }
})

const Parent = defineComponent({
  components: { Child },
  setup() {
    provide('message', 'hello')
    return {}
  },
  template: `<Child />`
})
```

- A: `Child received: hello`
- B: `Child received: default`
- C: `Child received: undefined`
- D: Ошибка, сообщение не может быть получено

::: details Ответ
<div>
<h4>Правильный ответ: A</h4>

Vue 3 предоставляет механизм внедрения зависимостей через функции `provide` и `inject`, которые позволяют родительским компонентам предоставлять данные своим потомкам, независимо от глубины вложенности.

В этом примере:
1. Родительский компонент `Parent` использует `provide('message', 'hello')` для предоставления значения `'hello'` с ключом `'message'`.
2. Дочерний компонент `Child` использует `inject('message', 'default')` для получения значения с ключом `'message'`. Второй аргумент `'default'` - это значение по умолчанию, которое будет использовано, если значение с ключом `'message'` не было предоставлено.

Поскольку родительский компонент предоставил значение `'hello'`, дочерний компонент получит именно его, а не значение по умолчанию. Поэтому будет выведено `Child received: hello`.

</div>
:::

## Вопрос № 9

```js
import { ref, onMounted, onUnmounted } from 'vue'

const Counter = {
  template: `<div>{{ count }}</div>`,
  setup() {
    const count = ref(0)
    
    let timer
    
    onMounted(() => {
      timer = setInterval(() => {
        count.value++
      }, 1000)
    })
    
    return { count }
  }
}
```

- A: Счетчик будет увеличиваться каждую секунду и работать корректно
- B: Счетчик будет увеличиваться, но вызовет утечку памяти при уничтожении компонента
- C: Счетчик не будет увеличиваться, так как нет обновления шаблона
- D: Произойдет ошибка, потому что `onMounted` не определен

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

В этом примере создается компонент с таймером, который увеличивает счетчик каждую секунду. Таймер запускается при монтировании компонента, но в коде отсутствует очистка таймера при размонтировании компонента.

Когда компонент будет уничтожен (например, при переходе на другую страницу или при условном рендеринге), таймер продолжит работать, что приведет к утечке памяти, поскольку он будет продолжать обращаться к уничтоженному компоненту.

Чтобы исправить эту проблему, необходимо добавить очистку таймера в хуке жизненного цикла `onUnmounted`:

```js
onUnmounted(() => {
  clearInterval(timer)
})
```

Это гарантирует, что таймер будет остановлен, когда компонент будет размонтирован.

</div>
::: 

## Вопрос № 10

```js
import { defineComponent, ref, customRef } from 'vue'

function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

export default defineComponent({
  setup() {
    const searchQuery = useDebouncedRef('', 500)
    
    function updateSearch() {
      searchQuery.value = 'new search'
      console.log(searchQuery.value)
    }
    
    return { searchQuery, updateSearch }
  }
})
```

- A: Выведет `'new search'`
- B: Выведет `''` (пустую строку)
- C: Выведет `undefined`
- D: Произойдет ошибка из-за неправильного использования `customRef`

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

В этом примере создается пользовательский реактивный ref с использованием `customRef`, который реализует механизм debounce (задержку) при установке нового значения.

Функция `useDebouncedRef` создает реактивную ссылку со специальной логикой:
1. Метод `get()` просто возвращает текущее значение.
2. Метод `set()` не устанавливает новое значение немедленно, а запускает таймер. Через указанную задержку (500 мс) новое значение устанавливается, и вызывается `trigger()` для уведомления Vue о необходимости обновления.

Когда вызывается `updateSearch()`, новое значение `'new search'` устанавливается с задержкой. Однако следующая строка `console.log(searchQuery.value)` выполняется сразу, до срабатывания таймера, поэтому выводится старое значение `''`.

Если бы мы обернули вызов `console.log` в setTimeout с большей задержкой, мы бы увидели новое значение.

</div>
:::

## Вопрос № 11

```js
import { reactive, isReactive, isRef } from 'vue'

const state = reactive({
  count: 0,
  nested: {
    value: 'test'
  }
})

console.log(isReactive(state))
console.log(isReactive(state.nested))
console.log(isRef(state.count))
```

- A: `true`, `true`, `true`
- B: `true`, `true`, `false`
- C: `true`, `false`, `false`
- D: `false`, `false`, `false`

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

В Vue 3 функция `reactive` создает глубоко реактивный прокси-объект. Это означает, что не только сам объект становится реактивным, но и все его вложенные объекты также преобразуются в реактивные.

Поэтому:
1. `isReactive(state)` возвращает `true`, так как `state` является реактивным объектом.
2. `isReactive(state.nested)` также возвращает `true`, так как `nested` автоматически был преобразован в реактивный объект при создании `state`.
3. `isRef(state.count)` возвращает `false`, потому что `count` является примитивным значением (числом) внутри реактивного объекта, а не объектом ref. Примитивные значения внутри реактивных объектов не преобразуются в ref-объекты.

Стоит отметить, что если бы мы создали `count` с помощью функции `ref`, то `isRef(count)` вернуло бы `true`.

</div>
:::

## Вопрос № 12

```js
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  setup(props, { slots }) {
    return () => h(
      `h${props.level}`,
      {},
      slots.default ? slots.default() : []
    )
  }
})
```

- A: Компонент, который отображает обычный текст
- B: Компонент, который отображает заголовок с уровнем, указанным в props
- C: Компонент с ошибкой, так как функция `h` используется неправильно
- D: Компонент с ошибкой, так как в setup должен возвращаться объект

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

Данный код определяет компонент, который динамически создает HTML-элемент заголовка (`h1`, `h2`, `h3` и т.д.) в зависимости от значения свойства `level`.

В Vue 3 функция `setup` может возвращать одно из двух:
1. Объект со свойствами и методами, которые станут доступны в шаблоне
2. Функцию рендеринга, которая будет использоваться для создания виртуального DOM

В данном случае `setup` возвращает функцию рендеринга, которая использует функцию `h` (гиперскрипт) для создания виртуального DOM-узла. Параметры функции `h`:
1. Тип элемента - в нашем случае динамический строковый литерал `h${props.level}`, который преобразуется в `h1`, `h2` и т.д.
2. Пустой объект пропсов
3. Дочерние элементы - содержимое слота по умолчанию, если оно есть

Таким образом, компонент будет отображать заголовок с уровнем, указанным в props, и содержимым, переданным через слот.

</div>
:::

## Вопрос № 13

```js
import { defineComponent, ref, onBeforeMount, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const message = ref('initial')
    
    onBeforeMount(() => {
      message.value = 'before mount'
    })
    
    onMounted(() => {
      setTimeout(() => {
        message.value = 'after mount'
      }, 0)
      
      message.value = 'mounted'
    })
    
    return { message }
  },
  
  template: `<div>{{ message }}</div>`
})
```

- A: Компонент отобразит 'initial', затем 'before mount', затем 'mounted' и, наконец, 'after mount'
- B: Компонент сразу отобразит 'mounted' и затем 'after mount'
- C: Компонент отобразит 'before mount', затем 'mounted' и, наконец, 'after mount'
- D: Компонент отобразит только 'after mount'

::: details Ответ
<div>
<h4>Правильный ответ: C</h4>

Vue 3 имеет несколько хуков жизненного цикла, которые выполняются в определенном порядке:

1. `setup` выполняется перед созданием компонента
2. `onBeforeMount` вызывается перед тем, как компонент будет добавлен в DOM
3. `onMounted` вызывается после того, как компонент добавлен в DOM

В данном примере:
- Изначально `message` имеет значение 'initial'
- В хуке `onBeforeMount` значение меняется на 'before mount'
- В хуке `onMounted` значение меняется на 'mounted'
- Затем, через `setTimeout` с задержкой 0 мс, значение меняется на 'after mount'

Несмотря на то, что задержка в `setTimeout` равна 0, этот код будет выполнен асинхронно, после завершения текущего цикла событий. Поэтому пользователь сначала увидит 'before mount' (DOM еще не создан), затем 'mounted' (сразу после создания DOM), и только потом 'after mount' (в следующем цикле событий).

Значение 'initial' пользователь не увидит, так как оно меняется до рендеринга компонента.

</div>
:::

## Вопрос № 14

```js
import { defineComponent, ref, readonly } from 'vue'

export default defineComponent({
  setup() {
    const original = ref({ count: 0 })
    const copy = readonly(original)
    
    function updateValues() {
      original.value.count = 1
      try {
        copy.value.count = 2
      } catch (e) {
        console.log('Error caught')
      }
      
      return [original.value.count, copy.value.count]
    }
    
    return { updateValues }
  }
})
```

- A: `updateValues()` возвращает `[1, 0]`
- B: `updateValues()` возвращает `[1, 1]`
- C: `updateValues()` возвращает `[1, 2]`
- D: `updateValues()` возвращает `[1, 1]` и выводит 'Error caught'

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

Функция `readonly` в Vue 3 создает доступный только для чтения прокси-объект для переданного оригинального объекта. Важно понимать, что:

1. `readonly` создает одностороннюю связь - изменения в оригинальном объекте отражаются в доступном только для чтения прокси
2. Попытки изменить сам прокси-объект вызовут предупреждение в режиме разработки и будут игнорироваться

В данном примере:
- `original` - это реактивный ref-объект
- `copy` - это доступный только для чтения прокси на `original`

Когда мы изменяем `original.value.count = 1`, это значение также меняется в `copy.value.count`, поскольку существует односторонняя связь.

Попытка присвоить `copy.value.count = 2` будет проигнорирована и вызовет предупреждение в консоли, но не вызовет исключение в режиме разработки (хотя в строгом режиме или в production-сборке может вызывать ошибку).

Поэтому `updateValues()` вернет `[1, 1]`. Блок `catch` не выполнится, так как исключение не генерируется.

</div>
:::

## Вопрос № 15

```js
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const obj = ref({ a: 1, b: 2 })
    const arr = ref([1, 2, 3])
    const messages = ref([])
    
    watch(obj, () => {
      messages.value.push('obj changed')
    })
    
    watch(arr, () => {
      messages.value.push('arr changed')
    })
    
    function update() {
      obj.value.a = 3
      arr.value.push(4)
      
      return messages.value
    }
    
    return { update }
  }
})
```

- A: `update()` возвращает пустой массив `[]`
- B: `update()` возвращает `['obj changed']`
- C: `update()` возвращает `['arr changed']`
- D: `update()` возвращает `['obj changed', 'arr changed']`

::: details Ответ
<div>
<h4>Правильный ответ: A</h4>

В Vue 3 функция `watch` по умолчанию не отслеживает глубокие изменения в объектах и мутации массивов. Это важное отличие от Vue 2.

Когда мы выполняем `obj.value.a = 3`, мы изменяем свойство внутри объекта, а не саму ссылку `obj.value`. По умолчанию `watch` срабатывает только при замене самого значения ref (`obj.value = ...`).

Аналогично, метод `arr.value.push(4)` мутирует массив, но не заменяет саму ссылку.

Чтобы отслеживать глубокие изменения, нужно использовать опцию `deep: true`:

```js
watch(obj, () => {
  messages.value.push('obj changed')
}, { deep: true })

watch(arr, () => {
  messages.value.push('arr changed')
}, { deep: true })
```

Без этой опции наблюдатели не сработают, и массив `messages` останется пустым.

</div>
:::

## Вопрос № 16

```js
import { defineComponent, markRaw, reactive } from 'vue'

class Counter {
  constructor() {
    this.count = 0
  }
  
  increment() {
    this.count++
  }
}

export default defineComponent({
  setup() {
    const counter1 = reactive(new Counter())
    const counter2 = reactive(markRaw(new Counter()))
    
    function test() {
      counter1.increment()
      counter2.increment()
      
      return [counter1.count, counter2.count]
    }
    
    return { test }
  }
})
```

- A: `test()` возвращает `[1, 1]` и оба счетчика обновляют шаблон
- B: `test()` возвращает `[0, 0]` и возникает ошибка
- C: `test()` возвращает `[1, 1]`, но только counter1 вызывает обновление шаблона
- D: `test()` возвращает `[1, 0]`

::: details Ответ
<div>
<h4>Правильный ответ: C</h4>

Функция `markRaw` в Vue 3 помечает объект как "сырой" (raw), что означает, что он не будет преобразован в реактивный прокси даже при передаче в функции реактивности, такие как `reactive`.

В данном примере:
1. `counter1` - это обычный реактивный объект, созданный из экземпляра класса `Counter`
2. `counter2` - также передан в `reactive`, но перед этим помечен как "сырой" с помощью `markRaw`

Когда мы вызываем метод `increment()` для обоих объектов:
- `counter1.increment()` увеличивает счетчик и, поскольку это реактивный объект, изменение будет отслеживаться и вызовет обновление шаблона
- `counter2.increment()` также увеличивает счетчик, но поскольку объект был помечен как "сырой", это изменение не является реактивным и не вызовет обновление шаблона

Функция `test()` возвращает корректные текущие значения `[1, 1]`, но только изменение в `counter1` приведет к обновлению отображения.

`markRaw` полезен для оптимизации производительности, когда мы хотим избежать затрат на создание прокси для больших объектов, которые не нуждаются в реактивности, или для объектов, которые не могут быть корректно преобразованы в прокси.

</div>
:::

## Вопрос № 17

```js
<template>
  <Child>
    <template v-slot:header="slotProps">
      {{ slotProps.title }}
    </template>
  </Child>
</template>

<script>
import { defineComponent, h } from 'vue'

const Child = defineComponent({
  setup(props, { slots }) {
    return () => h('div', {}, [
      slots.header ? slots.header({ title: 'Hello' }) : null,
      slots.default ? slots.default() : null
    ])
  }
})

export default defineComponent({
  components: { Child }
})
</script>
```

- A: Ничего не отобразится
- B: Отобразится пустой div
- C: Отобразится 'Hello'
- D: Возникнет ошибка компиляции

::: details Ответ
<div>
<h4>Правильный ответ: C</h4>

Этот пример демонстрирует использование именованных слотов с пропсами слотов в Vue 3.

В родительском компоненте мы используем дочерний компонент `Child` и определяем содержимое для именованного слота `header`, используя директиву `v-slot:header`. Пропсы слота принимаются через параметр `slotProps`.

Дочерний компонент `Child` определен с использованием функционального подхода через `setup`. Он создает div и проверяет наличие слотов:
1. Если существует слот `header`, то он вызывается с аргументом `{ title: 'Hello' }`
2. Если существует слот по умолчанию, то он вызывается (в нашем примере мы не предоставили содержимое для слота по умолчанию)

Когда родительский компонент получает `slotProps.title` в слоте `header`, он отображает значение `'Hello'`, которое было передано из дочернего компонента.

Таким образом, результатом рендеринга будет div с текстом 'Hello'.

</div>
:::

## Вопрос № 18

```js
import { defineComponent, ref, nextTick } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const result = ref([])
    
    async function test() {
      count.value = 1
      result.value.push(`A: ${count.value}`)
      
      await nextTick()
      result.value.push(`B: ${count.value}`)
      
      count.value = 2
      result.value.push(`C: ${count.value}`)
      
      return result.value
    }
    
    return { test }
  }
})
```

- A: `test()` возвращает Promise, который разрешается в `['A: 1', 'B: 1', 'C: 2']`
- B: `test()` возвращает `['A: 0', 'B: 1', 'C: 1']`
- C: `test()` возвращает `['A: 1', 'B: 2', 'C: 2']`
- D: `test()` возвращает `['A: 1', 'B: 1', 'C: 1']`

::: details Ответ
<div>
<h4>Правильный ответ: A</h4>

Функция `nextTick` в Vue 3 возвращает Promise, который разрешается после завершения следующего цикла обновления DOM. Она позволяет дождаться, пока Vue применит все реактивные обновления к DOM.

Анализируем выполнение функции `test()`:

1. `count.value = 1` - устанавливаем значение `count` равным 1
2. `result.value.push(`A: ${count.value}`)` - добавляем в массив строку 'A: 1'
3. `await nextTick()` - ждем завершения цикла обновления DOM
4. `result.value.push(`B: ${count.value}`)` - добавляем строку 'B: 1' (значение `count` всё еще равно 1)
5. `count.value = 2` - устанавливаем значение `count` равным 2
6. `result.value.push(`C: ${count.value}`)` - добавляем строку 'C: 2'

Таким образом, `test()` возвращает Promise, который разрешается в массив `['A: 1', 'B: 1', 'C: 2']`.

Важно отметить, что `nextTick` позволяет дождаться применения изменений в DOM, но не влияет на значения реактивных переменных - они изменяются немедленно.

</div>
:::

## Вопрос № 19

```js
import { defineComponent, ref, readonly, watchEffect } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const readonlyCount = readonly(count)
    const log = ref([])
    
    watchEffect(() => {
      log.value.push(`Count changed to: ${count.value}`)
    })
    
    watchEffect(() => {
      log.value.push(`ReadonlyCount changed to: ${readonlyCount.value}`)
    })
    
    function increment() {
      count.value++
      return log.value
    }
    
    return { increment }
  }
})
```

- A: `increment()` возвращает `['Count changed to: 0', 'ReadonlyCount changed to: 0', 'Count changed to: 1']`
- B: `increment()` возвращает `['Count changed to: 0', 'ReadonlyCount changed to: 0', 'Count changed to: 1', 'ReadonlyCount changed to: 1']`
- C: `increment()` возвращает `['Count changed to: 1', 'ReadonlyCount changed to: 1']`
- D: `increment()` возвращает `['Count changed to: 1']`

::: details Ответ
<div>
<h4>Правильный ответ: B</h4>

В Vue 3 функция `watchEffect` запускается немедленно при создании и затем перезапускается всякий раз, когда изменяются ее зависимости (реактивные значения, используемые внутри функции).

Функция `readonly` создает доступный только для чтения прокси для реактивного объекта, но сохраняет реактивную связь - изменения в оригинальном объекте отражаются в доступном только для чтения прокси.

В нашем примере:
1. Сначала оба `watchEffect` выполняются при создании и добавляют в лог начальные значения:
    - `'Count changed to: 0'`
    - `'ReadonlyCount changed to: 0'`
2. Затем вызывается `increment()`, увеличивающий `count.value`
3. Изменение `count` вызывает перезапуск первого `watchEffect`:
    - `'Count changed to: 1'`
4. Поскольку `readonlyCount` связан с `count`, изменение `count` также вызывает перезапуск второго `watchEffect`:
    - `'ReadonlyCount changed to: 1'`

Итоговый массив будет содержать все четыре записи в порядке их добавления:
`['Count changed to: 0', 'ReadonlyCount changed to: 0', 'Count changed to: 1', 'ReadonlyCount changed to: 1']`

</div>
:::

## Вопрос № 20

```js
import { defineComponent, ref, onErrorCaptured } from 'vue'

const Child = defineComponent({
  setup() {
    throw new Error('Child component error')
    return {}
  }
})

export default defineComponent({
  components: { Child },
  setup() {
    const errors = ref([])
    
    onErrorCaptured((err, instance, info) => {
      errors.value.push(err.message)
      return false
    })
    
    return { errors }
  },
  template: `
    <div>
      <Child />
      <div>Errors: {{ errors }}</div>
    </div>
  `
})
```

- A: Отобразится только сообщение об ошибке в консоли
- B: Отобразится "Errors: []" без компонента Child
- C: Отобразится "Errors: [Child component error]" без компонента Child
- D: Возникнет непойманная ошибка и приложение упадет

::: details Ответ
<div>
<h4>Правильный ответ: C</h4>

Хук жизненного цикла `onErrorCaptured` в Vue 3 используется для перехвата ошибок, которые происходят в дочерних компонентах. Он принимает три параметра:
1. `err` - объект ошибки
2. `instance` - экземпляр компонента, в котором произошла ошибка
3. `info` - строка с информацией о типе ошибки

В данном примере:
1. Дочерний компонент `Child` генерирует ошибку в своем хуке `setup`
2. Родительский компонент регистрирует хук `onErrorCaptured`, который:
    - Добавляет сообщение об ошибке в массив `errors`
    - Возвращает `false`, что предотвращает распространение ошибки дальше по цепочке компонентов

Когда хук `onErrorCaptured` возвращает `false`, это означает, что ошибка была "обработана" и не должна распространяться дальше. В результате:
- Ошибка не попадет в консоль браузера
- Дочерний компонент `Child` не будет отрисован
- Родительский компонент продолжит работу и отобразит массив ошибок: "Errors: [Child component error]"

Этот подход полезен для создания механизмов обработки ошибок в приложениях Vue.

</div>
::: 