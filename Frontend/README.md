# TenantPad Frontend

## Multi-Tenancy Approach

TenantPad uses a **shared schema with a tenant ID column** for multi-tenancy.
All data access is scoped to the current user's tenant, so users can only see and manage notes and users for their own company.

A minimal React + Vite frontend for the multi-tenant SaaS Notes application.  
Connects to the [TenantPad Backend](../Backend/readme.md) and supports tenant isolation, role-based access, and subscription upgrades.

---

## Features

- **Login** for all predefined test accounts
- **Signup** for first admin of a new tenant/company
- **Notes CRUD** (create, view, edit, delete) for your tenant only
- **Role-based UI**:  
  - Admins can invite users and upgrade subscription
  - Members can only manage notes
- **Upgrade to Pro**:  
  - Free plan: max 3 notes per tenant
  - Admins can upgrade to Pro for unlimited notes
- **Invite Users** (admin only)
- **Responsive UI** with Tailwind CSS
- **Protected routes** using React Router

---

## Getting Started

### 1. Install dependencies

```sh
cd Frontend
npm install
```

### 2. Configure API URL

Set your backend API URL in the `.env` file:

```
VITE_BASE_URL=https://<your-backend-vercel-url>
```
> For local development, use `http://localhost:3000` if your backend runs locally.

### 3. Run the frontend

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Deployment

- Deploy to [Vercel](https://vercel.com/) for production.
- Set the `VITE_BASE_URL` environment variable in your Vercel project settings to your deployed backend API URL.

---

## Usage

### Test Accounts

Use these accounts to log in (all passwords: `password`):

- `admin@acme.test` (Admin, Acme)
- `user@acme.test` (Member, Acme)
- `admin@globex.test` (Admin, Globex)
- `user@globex.test` (Member, Globex)

### Main Screens

- **Login:** `/login`
- **Signup:** `/signup` (only for first admin of a new company)
- **Home:** `/` (dashboard, upgrade, invite)
- **Notes:** `/notes` (list, create, edit, delete)
- **Invite:** `/invite` (admin only)

---

## Project Structure

```
Frontend/
  src/
    components/
      Home.jsx
      Invite.jsx
      Login.jsx
      Notes.jsx
      Popup.jsx
      PrivateRoute.jsx
      Signup.jsx
    context/
      AuthContext.jsx
    App.jsx
    main.jsx
    index.css
  public/
    vite.svg
  .env
  package.json
  vite.config.js
  README.md
```

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

---

## Notes

- All API requests require a valid JWT token (handled automatically after login).
- CORS must be enabled on the backend for frontend to work.
- "Upgrade to Pro" is only visible to Admins when the note limit is reached.
- Members cannot invite users or upgrade the plan.

---

## License

ISC

---
