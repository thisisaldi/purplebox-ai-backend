# purplebox-ai-backend
A test project.
This project is a RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing items. It includes **authentication (JWT)**, **user registration/login**, **CRUD operations for items**, **pagination**, and **input validation**.

Postman to test the APIs:

[Postman Workspace – Purplebox AI Backend](https://www.postman.com/grey-zodiac-484010/workspace/purplebox-ai-backend)

---

## Features

- User Registration and Login (JWT-based auth)
- Secure Password Hashing using Bcrypt
- Protected Routes with Middleware
- CRUD Operations for Items
- Input Validation with express-validator
- Centralized Error Handling
- Pagination for Item Listing
- Cookie-based or Bearer Token Authentication
- MongoDB as the database (via Mongoose)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following (an example will be provided in the link provided down below):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### 4. Run the project
```bash
npm run dev
```

Server will start at: `http://localhost:8000`

## API Documentation

### Auth Routes

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | `/auth/register`   | Register a new user    |
| POST   | `/auth/login`      | Login and receive JWT  |

---

### User Routes

| Method | Endpoint     | Description                      |
|--------|--------------|----------------------------------|
| GET    | `/profile`   | Get current logged-in user data  |

> Protected: Requires JWT token (cookie or `Authorization: Bearer <token>`)

---

### Item Routes

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| POST   | `/items`         | Create a new item        |
| GET    | `/items`         | Get all items with pagination        |
| GET    | `/items/:id`     | Get a single item by ID              |
| PUT    | `/items/:id`     | Update an item           |
| DELETE | `/items/:id`     | Delete an item           |

---

### Pagination (for `/items`)

Use query parameters:

- `page`: Current page number (default: 1)
- `limit`: Number of items per page (default: 10)

Example:
```
GET /items?page=2&limit=5
```

--

## Sample Request/Response

### Register

```
POST /auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepass123"
}
```

### Login

```
POST /auth/login
{
  "email": "jane@example.com",
  "password": "securepass123"
}
```

### Create Item

```
POST /items
{
  "name": "Pen",
  "description": "A pen."
}
```

### Retrieve Items Example Response

```
GET /items?page=1&limit=5
{
    "page": 1,
    "totalItems": 18,
    "totalPages": 4,
    "items": [
        {
            "_id": "68805...",
            "name": "Book 3",
            "description": "A book 3."
        },
        {
            "_id": "68805...",
            "name": "Book 4",
            "description": "A book 4."
        },
        ...
    ]
}
```

## Tech Stack
- Node.js
- Express
- MongoDB with Mongoose
- TypeScript
- JWT for authentication
- Bcrypt for password hashing
- Express-validator for input validation

## Testing using Postman

All API endpoints can be tested using **Postman**.

You can view and import the Postman Collection from the following link:  
[Postman Workspace – Purplebox AI Backend](https://www.postman.com/grey-zodiac-484010/workspace/purplebox-ai-backend)

> Make sure to configure the environment accordingly.

## Submission for Behavioural Question

[Behavioural Question Video](https://drive.google.com/file/d/1L0HamW_PB2xpcGIcxwWtfUzQpZ1w9a0o/view?usp=sharing)