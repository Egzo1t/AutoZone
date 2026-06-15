# AutoZone Product Inventory & Order Management System

## Overview

This project is a full-stack implementation of a simplified Product Inventory & Order Management system built as part of a take-home coding exercise.

The goal was to design and implement a small but realistic e-commerce backend with a lightweight frontend while focusing on maintainability, data consistency, correctness under concurrent stock updates, and overall code quality.

Rather than maximizing the number of features, the implementation prioritizes:

* Clear separation of concerns
* Strong TypeScript typing
* Sensible database design
* Maintainable project structure
* Correct stock handling during order creation
* Incremental Git history and readable commits

---

## Tech Stack

### Backend

* Node.js
* Fastify
* TypeScript
* PostgreSQL
* Drizzle ORM
* Zod

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router

### Database

* PostgreSQL

---

## Implemented Features

### Backend

#### Product Management

* Create Product
* Get All Products
* Get Product By ID
* Update Product
* Delete Product

Product fields:

* id (UUID)
* name
* sku
* price
* stockQuantity
* category

#### Order Management

* Create orders containing one or more products
* Validate stock before order creation
* Calculate order totals
* Persist orders and order items
* List orders with related line items

#### Validation & Error Handling

* Product existence validation
* Stock availability validation
* Meaningful error responses
* Centralized error handling

---

### Frontend

#### Product Listing

* Product catalog view
* Category filtering
* Product stock visibility
* Responsive card-based layout

#### Order Creation

* Add products to cart
* Select quantities
* Calculate order total
* Submit order to backend

#### Order Confirmation

* Success page after order creation
* Display order total
* Navigation back to products

---

## Database Design

### Why PostgreSQL?

PostgreSQL was chosen because inventory and order management systems naturally fit a relational data model.

The domain contains strong relationships between:

* Products
* Orders
* Order Items

A relational database provides:

* ACID transactions
* Referential integrity
* Consistency guarantees
* Row-level locking support

These capabilities are particularly important when handling inventory updates under concurrent requests.

---

## Data Model

### Products

Stores inventory information.

### Orders

Stores order metadata and the calculated order total.

### Order Items

Stores purchased products and quantities for each order.

The relationship between these entities is straightforward and allows orders to contain multiple products while preserving historical pricing and quantity information.

---

## Validation

Basic validation has been implemented using Zod.

The goal was to establish a validation layer early in the project and avoid relying solely on database constraints or controller-level checks.

Due to the limited timeframe of the exercise, Zod validation was only partially integrated. Given additional time, I would complete validation across all request payloads and centralize schema validation for products, orders, route parameters, and query parameters.

Using Zod provides:

* End-to-end type safety
* Consistent validation rules
* Better developer experience
* Easier long-term maintenance

---

## Concurrency Handling

One of the key requirements of the exercise was preventing overselling when multiple requests attempt to purchase the same stock simultaneously.

The chosen solution uses:

* PostgreSQL transactions
* Row-level locking (`SELECT FOR UPDATE`)

Order creation is executed inside a database transaction.

The process is:

1. Lock requested products.
2. Validate stock quantities.
3. Calculate order total.
4. Decrement stock.
5. Create the order.
6. Create related order items.
7. Commit the transaction.

Benefits of this approach:

* Prevents race conditions
* Prevents overselling
* Guarantees atomic updates
* Ensures rollback on failure

This solution was preferred over optimistic locking because inventory consistency is more important than maximizing write throughput for this type of application.

---

## API Endpoints

### Products

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

### Orders

```http
GET   /orders
POST  /orders
```

---

## Local Development Setup

### Prerequisites

* Node.js 18+
* PostgreSQL
* npm

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
DATABASE_URL=database_connection_string_send_by_email
PORT=3000
```

Generate migrations:

```bash
npm run db:generate
```

Run migrations:

```bash
npm run db:migrate
```

Seed database:

```bash
npm run db:seed
```

Start development server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Environment Variables

For security reasons, environment variables are not committed to the repository.

The required environment configuration will be shared separately via email.

Once the variables are added to the appropriate `.env` file, the application can be started using the setup instructions described in this document.

---

## Seed Data

The project includes seed data containing products across multiple categories:

* Cleaning
* Exterior Parts
* Interior Accessories
* Lighting
* Performance Parts
* General Car Accessories

The seed data exists to simplify testing and demonstration of the order flow.

---

## Testing

The application was tested extensively during development using Postman, manual API and UI testing.

This included:

* Product CRUD operations
* Order creation
* Stock updates
* Invalid product requests
* Out-of-stock scenarios
* Invalid quantities
* Various edge cases around order creation and validation

Because the exercise was intentionally time-boxed, I prioritized implementing and verifying the core business logic rather than investing significant time into setting up a complete automated testing suite.

If additional time were available, I would add automated tests focusing primarily on:

* Order creation logic
* Stock validation
* Concurrency scenarios
* Repository integration tests
* API endpoint integration tests

My next choice would likely be Vitest together with Fastify testing utilities and a dedicated test database.

---

## Trade-Offs

Given the time-boxed nature of the exercise, several decisions were made intentionally.

### Prioritized

* Core business requirements
* Concurrency-safe stock handling
* Type safety
* Clean project structure
* Readable and maintainable code

### Deferred

* Authentication and authorization
* Complete Zod integration
* Automated test suite
* Dockerization
* CI/CD setup
* API documentation

---

## What I Would Improve With More Time

### Backend

* Complete Zod integration across all request schemas
* Add automated integration and concurrency tests
* Add OpenAPI / Swagger documentation
* Introduce pagination and server-side filtering
* Improve logging and monitoring support
* Add authentication and authorization

### Frontend

* Introduce React Query for server state management
* Add toast notifications and improved user feedback
* Persist cart state
* Improve loading and error states
* Enhance mobile responsiveness

### Infrastructure

* Dockerize the application
* Add Docker Compose setup
* Add CI pipeline for linting and testing
* Prepare deployment configuration

---

## Infrastructure Notes

The current version is intended to be run locally by following the setup instructions above.

If more time were available, I would containerize the entire application using Docker and Docker Compose to provide a fully reproducible development environment with a single startup command.

This would include:

* PostgreSQL container
* Backend container
* Frontend container
* Shared networking and environment configuration

For the scope of this exercise, I chose to focus on the application architecture, business logic, and correctness rather than deployment infrastructure.

---

## Final Notes

Given the limited timeframe of the exercise, the primary focus was correctness, maintainability, and delivering a complete end-to-end solution.

Particular attention was given to inventory consistency and order processing, as these represent the most critical business requirements in this domain.

Where trade-offs were necessary, priority was given to delivering a clean, reliable, and understandable solution rather than maximizing feature count.
