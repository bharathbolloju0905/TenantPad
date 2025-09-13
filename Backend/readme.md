# TenantPad Backend

A multi-tenant SaaS Notes backend built with Node.js, Express, and MongoDB.

---

## Features

- Multi-tenancy: Isolated data per tenant (company)
- JWT authentication & role-based access (admin/member)
- Admins invite users, upgrade plan
- Notes CRUD with tenant isolation & plan limits
- Health check, CORS enabled
- Seed script for test accounts

---

## Getting Started

1. **Clone & Install**
   ```sh
   git clone <repo-url>
   cd Backend
   npm install
   ```
2. **Environment Variables**
   Create a `.env` file:
   ```
   MONGO_URL=mongodb://localhost:27017/tenantpad
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
3. **Seed Test Data**
   ```sh
   node seed.js
   ```
4. **Run the Server**
   ```sh
   node app.js
   ```

---

## API Endpoints & Examples

### Auth

#### POST /auth/signup
Register the first admin for a new tenant.
```json
{
  "email": "admin@acme.test",
  "password": "password",
  "tenant": "Acme"
}
```
_Response:_
```json
{
  "token": "<jwt>"
}
```

#### POST /auth/login
Login and receive a JWT.
```json
{
  "email": "admin@acme.test",
  "password": "password"
}
```
_Response:_
```json
{
  "token": "<jwt>"
}
```

---

### Notes

#### POST /notes
Create a note (tenant-scoped, plan limit enforced).
_Headers:_ `Authorization: Bearer <jwt>`
```json
{
  "title": "Meeting Notes",
  "content": "Discussed Q3 goals."
}
```
_Response:_
```json
{
  "_id": "...",
  "title": "Meeting Notes",
  "content": "Discussed Q3 goals.",
  "tenant": "...",
  "createdBy": "..."
}
```

#### GET /notes
List all notes for the current tenant.
_Headers:_ `Authorization: Bearer <jwt>`
_Response:_
```json
[
  { "_id": "...", "title": "Meeting Notes", ... },
  { "_id": "...", "title": "Sprint Plan", ... }
]
```

#### GET /notes/:id
Get a single note (must belong to tenant).
_Headers:_ `Authorization: Bearer <jwt>`
_Response:_
```json
{ "_id": "...", "title": "Meeting Notes", ... }
```

#### PUT /notes/:id
Update a note (tenant & role restrictions apply).
_Headers:_ `Authorization: Bearer <jwt>`
```json
{
  "title": "Updated Title"
}
```
_Response:_
```json
{ "_id": "...", "title": "Updated Title", ... }
```

#### DELETE /notes/:id
Delete a note (tenant & role restrictions apply).
_Headers:_ `Authorization: Bearer <jwt>`
_Response:_
```json
{ "message": "Note deleted" }
```

---

### User Management

#### POST /users/invite
Admin invites a new user to their tenant.
_Headers:_ `Authorization: Bearer <jwt>`
```json
{
  "email": "user@acme.test"
}
```
_Response:_
```json
{
  "email": "user@acme.test",
  "role": "member",
  "tenant": "Acme",
  "password": "password"
}
```

---

### Subscription

#### POST /tenants/:slug/upgrade
Admin upgrades tenant to Pro plan (removes note limit).
_Headers:_ `Authorization: Bearer <jwt>`
_Response:_
```json
{ "message": "Tenant upgraded to Pro plan" }
```

---

### Utilities

#### GET /health
Health check endpoint.
_Response:_
```json
{ "status": "ok" }
```

---

## Test Accounts

- `admin@acme.test` (Admin, Acme)
- `user@acme.test` (Member, Acme)
- `admin@globex.test` (Admin, Globex)
- `user@globex.test` (Member, Globex)
- Password for all: `password`

---

## Security

- All endpoints (except `/auth/*` and `/health`) require JWT.
- Role-based access for admin actions.
- Tenant isolation enforced on all note/user operations.

---

## License
ISC

---

## Author
BharathBolloju
