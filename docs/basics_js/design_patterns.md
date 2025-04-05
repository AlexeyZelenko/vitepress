---
title: Паттерны проектирования
description: Обзор основных шаблонов проектирования в объектно-ориентированном программировании
---

# Руководство по паттернам проектирования

## Введение

Паттерны проектирования - это типовые решения часто встречающихся проблем в разработке программного обеспечения. Они помогают создавать более гибкий, расширяемый и поддерживаемый код.

## Классификация паттернов

Паттерны обычно подразделяются на три основные группы:
1. Порождающие (Creational)
2. Структурные (Structural)
3. Поведенческие (Behavioral)

## 1. Порождающие паттерны

### 1.1 Singleton (Одиночка)
Гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к нему.

```typescript
class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connection: any;

    private constructor() {
        this.connection = this.initializeConnection();
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    private initializeConnection() {
        // Логика подключения к базе данных
        return {};
    }

    public getConnection() {
        return this.connection;
    }
}

// Использование
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true
```

### 1.2 Factory Method (Фабричный метод)
Определяет интерфейс для создания объекта, но позволяет подклассам выбирать, какой класс инстанциировать.

```typescript
interface Transport {
    deliver(): void;
}

class Truck implements Transport {
    deliver() {
        console.log("Доставка товаров грузовиком");
    }
}

class Ship implements Transport {
    deliver() {
        console.log("Доставка товаров кораблем");
    }
}

abstract class LogisticsFactory {
    abstract createTransport(): Transport;

    planDelivery() {
        const transport = this.createTransport();
        transport.deliver();
    }
}

class RoadLogistics extends LogisticsFactory {
    createTransport(): Transport {
        return new Truck();
    }
}

class SeaLogistics extends LogisticsFactory {
    createTransport(): Transport {
        return new Ship();
    }
}
```

### 1.3 Builder (Строитель)
Позволяет создавать сложные объекты пошагово.

```typescript
class Computer {
    private cpu: string = '';
    private ram: number = 0;
    private storage: string = '';

    setCPU(cpu: string): Computer {
        this.cpu = cpu;
        return this;
    }

    setRAM(ram: number): Computer {
        this.ram = ram;
        return this;
    }

    setStorage(storage: string): Computer {
        this.storage = storage;
        return this;
    }

    build(): string {
        return `Компьютер: CPU ${this.cpu}, RAM ${this.ram} ГБ, Хранилище ${this.storage}`;
    }
}

// Использование
const gaming = new Computer()
    .setCPU('Intel i9')
    .setRAM(32)
    .setStorage('1TB SSD')
    .build();
```

## 2. Структурные паттерны

### 2.1 Adapter (Адаптер)
Позволяет объектам с несовместимыми интерфейсами работать вместе.

```typescript
// Старый интерфейс
class EuropeanSocket {
    voltage220V(): string {
        return '220V';
    }
}

// Новый интерфейс
interface USASocket {
    voltage110V(): string;
}

// Адаптер
class SocketAdapter implements USASocket {
    private europeanSocket: EuropeanSocket;

    constructor(socket: EuropeanSocket) {
        this.europeanSocket = socket;
    }

    voltage110V(): string {
        const voltage = this.europeanSocket.voltage220V();
        return '110V (converted from ' + voltage + ')';
    }
}
```

### 2.2 Decorator (Декоратор)
Динамически добавляет объекту новые обязанности.

```typescript
interface Coffee {
    cost(): number;
    description(): string;
}

class SimpleCoffee implements Coffee {
    cost(): number {
        return 5;
    }

    description(): string {
        return 'Простой кофе';
    }
}

class MilkDecorator implements Coffee {
    private coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost(): number {
        return this.coffee.cost() + 2;
    }

    description(): string {
        return `${this.coffee.description()}, молоко`;
    }
}

class SugarDecorator implements Coffee {
    private coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost(): number {
        return this.coffee.cost() + 1;
    }

    description(): string {
        return `${this.coffee.description()}, сахар`;
    }
}
```

## 3. Поведенческие паттерны

### 3.1 Observer (Наблюдатель)
Определяет зависимость "один ко многим" между объектами.

```typescript
interface Observer {
    update(temperature: number): void;
}

class WeatherStation {
    private observers: Observer[] = [];
    private temperature: number = 0;

    addObserver(observer: Observer) {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    setTemperature(temp: number) {
        this.temperature = temp;
        this.notifyObservers();
    }

    private notifyObservers() {
        this.observers.forEach(observer => 
            observer.update(this.temperature)
        );
    }
}

class TemperatureDisplay implements Observer {
    update(temperature: number) {
        console.log(`Температура: ${temperature}°C`);
    }
}
```

### 3.2 Strategy (Стратегия)
Определяет семейство алгоритмов, инкапсулирует каждый из них и обеспечивает их взаимозаменяемость.

```typescript
interface SortStrategy {
    sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
    sort(data: number[]): number[] {
        // Реализация сортировки пузырьком
        return data.sort((a, b) => a - b);
    }
}

class QuickSort implements SortStrategy {
    sort(data: number[]): number[] {
        // Реализация быстрой сортировки
        return data.sort((a, b) => a - b);
    }
}

class Sorter {
    private strategy: SortStrategy;

    constructor(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    performSort(data: number[]): number[] {
        return this.strategy.sort(data);
    }
}
```

## Заключение

Паттерны проектирования:
- Предоставляют проверенные решения типовых задач
- Улучшают архитектуру и читаемость кода
- Облегчают коммуникацию между разработчиками
- Помогают создавать более гибкие и расширяемые системы

**Важно!** Применяйте паттерны осознанно, только когда они действительно решают конкретную проблему в вашем проекте.

---
Руководство поможет вам эффективнее использовать паттерны проектирования!