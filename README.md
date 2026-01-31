# 🛡️ Secure RESTful Blog API

A production-ready, secure REST API built with **Node.js**, **Express**, and **Native MongoDB Driver** (no Mongoose).
This project demonstrates advanced backend concepts including **Layered Architecture**, **RBAC**, **JWT via HttpOnly Cookies**, and **Docker Containerization**.

> **Assignment 4:** Web Technologies 2 (Backend)

---

## 🚀 Features & Highlights

### 🏗 Architecture
* **Layered Structure:** Strict separation of concerns (`Controller` → `Service` → `Repository`).
* **Native MongoDB:** Direct usage of `MongoClient` with `insertOne`, `findOne`, `updateOne`, `aggregate`.
* **Repository Pattern:** data access logic is decoupled from business logic.

### 🔐 Security (Hardened)
* **HttpOnly Cookies:** JWT tokens are stored in secure cookies (inaccessible to client-side JS), preventing XSS.
* **NoSQL Injection Protection:** Uses `express-mongo-sanitize` to strip malicious query operators.
* **Secure Headers:** Uses `helmet` to set secure HTTP headers.
* **Rate Limiting:** Protects auth endpoints against brute-force attacks.
* **Input Validation:** Strict server-side validation using `express-validator`.

### ✨ Advanced Features
* **Pagination:** Efficiently handles large datasets (`?page=1&limit=10`).
* **Search & Filtering:** Regex-based search implementation (`?search=keyword`).
* **Logging:** Request logging with `morgan` for monitoring.
* **Containerization:** Full Docker and Docker Compose setup.

---

## 🛠 Tech Stack

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Database:** MongoDB (Native Driver `mongodb`)
* **Authentication:** JWT (JSON Web Tokens) + Bcrypt
* **DevOps:** Docker, Docker Compose

---

## ⚙️ Installation & Run

### Option A: Docker Compose (Recommended) 🐳
The easiest way to run the API + Local MongoDB database.

1.  Create a `.env` file (see below).
2.  Run the command:
    ```bash
    docker-compose up --build
    ```
3.  Server will start at `http://localhost:3000`.

### Option B: Manual Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    MONGO_URI=mongodb+srv://<your_user>:<your_password>@cluster.mongodb.net/blogdb
    JWT_SECRET=super_secret_key_change_me
    NODE_ENV=development
    ```
3.  **Run Server:**
    ```bash
    # Development mode (with auto-reload)
    npm run dev

    # Production mode
    node server.js
    ```

---

## 📡 API Documentation

### 👤 Authentication
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login (Returns HttpOnly Cookie) | ❌ |
| `POST` | `/auth/logout` | Logout (Clears Cookie) | ✅ |
| `GET` | `/auth/me` | Get current user profile | ✅ |

### 📝 Blog Posts
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/blogs` | Get all blogs (Supports pagination & search) | ❌ |
| `GET` | `/blogs/:id` | Get single blog post | ❌ |
| `POST` | `/blogs` | Create a new post | ✅ |
| `PUT` | `/blogs/:id` | Update post (Author or Admin only) | ✅ |
| `DELETE` | `/blogs/:id` | Delete post (Author or Admin only) | ✅ |

### 🔍 Query Parameters Example
To use pagination and search:
```http
GET /blogs?page=1&limit=5&search=tech

```

---

## 📂 Project Structure

```text
src/
├── config/         # Database connection (Singleton pattern)
├── controllers/    # Request/Response handling
├── services/       # Business logic & Validation calls
├── repositories/   # Native MongoDB queries (CRUD)
├── middleware/     # Auth guards, Rate limiters, Validators
├── routes/         # API Routes definition
└── app.js          # Express app setup

```

---

## 🧪 Testing

1. Import the provided **Postman Collection**.
2. **Register** a new user.
3. **Login** (The `token` cookie will be set automatically by the server).
4. **Create** a blog post.
5. Try to **Delete** a post created by another user (Expect `403 Forbidden`).