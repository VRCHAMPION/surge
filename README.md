# Surge

Surge is a personal DevOps and Cloud engineering project focused on
safe zero-downtime deployments for a flash-sale e-commerce platform.

## Current Status

A minimal Express API for the store: products are stored in PostgreSQL, and the cart is currently held in memory.

## Goal

Build and demonstrate:

- CI/CD
- Docker
- Kubernetes
- Canary deployments
- Automated rollback
- Infrastructure as Code
- Observability
- Security automation

## Project Structure

```text
surge/
└── application/
    ├── server.js          # Express app entry point (health check, routes, error handler)
    ├── database/
    │   ├── index.js       # PostgreSQL connection pool (pg)
    │   └── schema.sql     # products and cart_items tables with seed data
    ├── routes/
    │   ├── products.js    # /products endpoints
    │   └── cart.js        # /cart endpoints
    └── data/              # in-memory data used by the cart routes
```

## Running Locally

Prerequisites: Node.js and a PostgreSQL database.

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/VRCHAMPION/surge.git
   cd surge
   npm install
   cd application
   npm install
   ```

2. Create the database tables and seed products:
   ```bash
   psql "$DATABASE_URL" -f database/schema.sql
   ```

3. Create `application/.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/surge
   PORT=3000
   NODE_ENV=development
   ```

4. Start the API:
   ```bash
   node server.js
   ```

The server runs on `http://localhost:3000` by default.

## API Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Health check |
| GET | `/products` | List products |
| GET | `/products/:id` | Get a product |
| POST | `/products` | Create a product |
| GET | `/cart` | List cart items |
| GET | `/cart/count` | Cart item count |
| GET | `/cart/:id` | Get a cart item |
| POST | `/cart` | Add an item to the cart |
| PUT | `/cart/:id` | Update a cart item |
| DELETE | `/cart/:id` | Remove a cart item |

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
