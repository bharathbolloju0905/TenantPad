# TenantPad – Multi-Tenant SaaS Notes Application

TenantPad is a full-stack multi-tenant SaaS Notes application built with **Node.js, Express, MongoDB** (Backend) and **React, Vite, Tailwind CSS** (Frontend).  
It enables multiple companies (tenants) to securely manage users and notes, with strict tenant isolation, role-based access, and subscription feature gating.

---

## Live Demo

- **Frontend:** [https://tenant-pad-5ij9.vercel.app/](https://tenant-pad-5ij9.vercel.app/)
- **Backend API:** [https://tenant-pad.vercel.app](https://tenant-pad.vercel.app)

---

## Multi-Tenancy Approach

TenantPad uses a **shared schema with a tenant ID column** for multi-tenancy.  
All user and note records include a `tenant` field referencing the tenant (company).  
All queries and operations are always scoped to the authenticated user's tenant, ensuring strict data isolation between tenants (e.g., Acme and Globex).

---

## Features

### Core

- **Multi-tenancy:** Isolated data per tenant (company)
- **JWT authentication & role-based access:**  
  - **Admin:** Invite users, upgrade plan  
  - **Member:** CRUD notes only
- **Notes CRUD:** Create, view, edit, delete notes (tenant isolation & plan limits)
- **Subscription plans:**  
  - **Free:** Max 3 notes per tenant  
  - **Pro:** Unlimited notes  
  - **Upgrade endpoint:** Admins can upgrade their tenant
- **Health check endpoint:** `/health`
- **CORS enabled** for frontend/backend integration

### Frontend

- **Login** for all predefined test accounts
- **Signup** for first admin of a new tenant/company
- **Role-based UI:**  
  - Admins can invite users and upgrade subscription  
  - Members can only manage notes
- **Upgrade to Pro:**  
  - Free plan: max 3 notes per tenant  
  - Admins can upgrade to Pro for unlimited notes
- **Invite Users** (admin only)
- **Responsive UI** with Tailwind CSS
- **Protected routes** using React Router

---

## Test Accounts

Use these accounts to log in (all passwords: `password`):

- `admin@acme.test` (Admin, Acme)
- `user@acme.test` (Member, Acme)
- `admin@globex.test` (Admin, Globex)
- `user@globex.test` (Member, Globex)

---

## Project Structure

```
TenantPad/
│
├── Backend/
│   ├── app.js
│   ├── package.json
│   ├── .env
│   ├── readme.md
│   ├── seed.js
│   ├── vercel.json
│   ├── controllers/
│   ├── DB/
│   ├── middlewares/
│   ├── models/
│   └── routes/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── README.md
│
└── README.md   ← (this file)
```

---

## Getting Started

### 1. Clone & Install

```sh
git clone <repo-url>
cd TenantPad/Backend
npm install
cd ../Frontend
npm install
```

### 2. Environment Variables

#### Backend (`Backend/.env`):

```
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=production
PORT=3000
```

#### Frontend (`Frontend/.env`):

```
VITE_BASE_URL=https://tenant-pad.vercel.app
```

### 3. Seed Test Data

```sh
cd Backend
node seed.js
```

### 4. Run Locally

#### Backend

```sh
cd Backend
node app.js
```

#### Frontend

```sh
cd Frontend
npm run dev
```

---

## API Endpoints

### Auth

- `POST /auth/signup` – Register first admin for a new tenant
- `POST /auth/login` – Login (returns JWT)
- `POST /auth/logout` – Logout
- `GET /auth/me` – Get current user profile

### Notes

- `POST /notes` – Create note (tenant-scoped, plan limit enforced)
- `GET /notes` – List notes for current tenant
- `GET /notes/:id` – Get note details (tenant-scoped)
- `PUT /notes/:id` – Update note (tenant-scoped)
- `DELETE /notes/:id` – Delete note (tenant-scoped)

### User Management

- `POST /users/invite` – Admins invite new users (default password: `password`)

### Subscription

- `POST /tenants/:slug/upgrade` – Admin upgrades tenant to Pro plan

### Utilities

- `GET /health` – Health check

---

## Deployment

- **Frontend:** Deployed to [Vercel](https://vercel.com/) at [https://tenant-pad-5ij9.vercel.app/](https://tenant-pad-5ij9.vercel.app/)
- **Backend:** Deployed to [Vercel](https://vercel.com/) at [https://tenant-pad.vercel.app](https://tenant-pad.vercel.app)
- **CORS** is enabled on the backend for frontend integration.

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, CORS
- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router

---

## Security

- All endpoints (except `/auth/*` and `/health`) require JWT authentication.
- Role-based access enforced for admin actions.
- Tenant isolation enforced on all note/user operations.

---

## License

ISC

---

## Author

BharathBolloju

---