---
title: Принципы проектирования ПО
description: Ключевые принципы разработки программного обеспечения, помогающие создавать качественный, поддерживаемый и эффективный код
---

# Руководство по принципам проектирования программного обеспечения

## 1. DRY (Don't Repeat Yourself) - Не повторяй себя

Принцип, утверждающий, что каждый элемент знаний должен иметь единственное, недвусмысленное представление в системе.

```typescript
// Плохой пример (дублирование кода)
function calculateRectangleArea(width: number, height: number): number {
    return width * height;
}

function calculateRectanglePerimeter(width: number, height: number): number {
    return 2 * (width * height);
}

// Хороший пример (устранение дублирования)
class Rectangle {
    constructor(private width: number, private height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}
```

## 2. KISS (Keep It Simple, Stupid) - Делай проще

Принцип, призывающий избегать unnecessary усложнений и писать максимально простой код.

```typescript
// Плохой пример (усложненное решение)
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i < Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Хороший пример (простое и понятное решение)
function isPrime(num: number): boolean {
    return num > 1 && 
           Array.from({length: num - 2}, (_, i) => i + 2)
           .every(divisor => num % divisor !== 0);
}
```

## 3. YAGNI (You Aren't Gonna Need It) - Вам это не понадобится

Принцип экстремального программирования, который советует не добавлять функциональность, пока она не становится необходимой.

```typescript
// Плохой пример (преждевременная оптимизация)
class UserService {
    private users: User[] = [];
    private cache: Map<string, User> = new Map();

    // Кэширование, которое может и не понадобиться
    getUserById(id: string): User | undefined {
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }
        const user = this.users.find(u => u.id === id);
        if (user) {
            this.cache.set(id, user);
        }
        return user;
    }
}

// Хороший пример (минимальная реализация)
class UserService {
    private users: User[] = [];

    getUserById(id: string): User | undefined {
        return this.users.find(u => u.id === id);
    }
}
```

## 4. SOLID - Принципы объектно-ориентированного проектирования

(Краткое описание, подробнее в предыдущем руководстве)
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## 5. GRASP (General Responsibility Assignment Software Patterns)

Набор принципов для назначения ответственностей классам и объектам.

```typescript
// Пример применения GRASP - принцип Creator
class Order {
    private items: OrderItem[] = [];

    addItem(item: OrderItem) {
        this.items.push(item);
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    // Класс Order отвечает за создание связанных с ним объектов
    createInvoice(): Invoice {
        return new Invoice(this);
    }
}
```

## 6. Law of Demeter (Принцип Деметры)

Принцип, ограничивающий взаимодействие объектов, чтобы уменьшить связанность.

```typescript
// Плохой пример (нарушение принципа Деметры)
class User {
    getWallet(): Wallet {
        return this.wallet;
    }
}

class PaymentService {
    processPayment(user: User, amount: number) {
        // Слишком много знаний о внутренней структуре User
        const balance = user.getWallet().getBalance();
        user.getWallet().withdraw(amount);
    }
}

// Хороший пример
class User {
    private wallet: Wallet;

    withdrawFromWallet(amount: number): boolean {
        return this.wallet.withdraw(amount);
    }
}

class PaymentService {
    processPayment(user: User, amount: number) {
        // Минимум зависимостей
        user.withdrawFromWallet(amount);
    }
}
```

## 7. Separation of Concerns (Разделение ответственностей)

Принцип разделения программы на отдельные, слабо связанные части.

```typescript
// Разделение логики загрузки, обработки и отображения данных
class DataLoader {
    async fetchData(url: string) {
        const response = await fetch(url);
        return response.json();
    }
}

class DataProcessor {
    processData(data: any[]) {
        return data.filter(item => item.isValid);
    }
}

class DataRenderer {
    render(data: any[]) {
        // Логика визуализации данных
    }
}
```

## Заключение

Эти принципы помогают:
- Создавать более чистый и понятный код
- Уменьшать сложность программных систем
- Повышать гибкость и поддерживаемость кода
- Ускорять процесс разработки

Применение этих принципов требует практики и понимания контекста. Не стоит воспринимать их как догму - важно использовать их разумно и уместно.

---
Руководство поможет вам улучшить качество вашего программного обеспечения!