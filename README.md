# Movies App

Full-stack movie management application built with **React + TypeScript** (Frontend) and **Node.js + Express + Sequelize** (Backend). The application features a secure authentication system, full CRUD operations, and is fully containerized with Docker.

---

## Features

- **Secure Authentication:** JWT-based auth with Access & Refresh tokens using **HTTP-only cookies**.
- **Movie Management:** Full CRUD (Create, Read, Update, Delete) functionality.
- **Data Handling:** Advanced sorting and filtering of movie collections.
- **Type Safety:** End-to-end TypeScript implementation.
- **Containerization:** Ready-to-deploy Docker configurations for both services.

---

## Tech Stack

### Frontend

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Networking:** Axios (with interceptors for token refresh)
- **Deployment:** Docker

### Backend

- **Runtime:** Node.js + Express
- **ORM:** Sequelize
- **Database:** SQLite
- **Security:** JWT Authentication, Bcrypt, HTTP-only Cookies
- **Deployment:** Docker

---

## Installation & Setup

### Backend Setup

```bash
git clone [https://github.com/ivan-bilenkyi/movies-api.git](https://github.com/ivan-bilenkyi/movies-api.git)
cd movies-api
npm install
```

### Configure Environment

Create a .env file in the movies-api folder:

APP_PORT=8000
DB_PATH=./database.sqlite
JWT_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

### Run in Dev Mode

```bash
npm run dev
```

### Frontend Setup

```bash
git clone [https://github.com/ivan-bilenkyi/movies-frontend.git](https://github.com/ivan-bilenkyi/movies-frontend.git)
cd movies-api
npm install
```

### Configure Environment

Create a .env file in the movies-api folder:

VITE_API_URL=http://localhost:8050/api/v1
VITE_PORT=8050

### Run in Dev Mode

```bash
npm run dev
```

## Docker Installation & Setup

### Backend

```bash
docker build -t your_account/movies-api ./movies-api

docker run --name movies-api -p 8000:8050 -e APP_PORT=8050 your_account/movies-api
```

### Frontend

```bash
docker build --build-arg API_URL=http://localhost:8000/api/v1 -t your_account/movies-frontend ./frontend

docker run --name movies-frontend -p 3000:3000 your_account/movies-frontend
```
