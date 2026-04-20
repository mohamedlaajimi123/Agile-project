# Agile Project: Student Dashboard

## 🚀 Tech Stack
* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express, PostgreSQL

## 🛠 Setup
### 1. Clone
`git clone https://github.com/mohamedlaajimi123/Agile-project.git`
`cd Agile-project`

### 2. Frontend
`cd frontend && npm install && npm run dev`

### 3. Backend
`cd ../horizon-backend && npm install && npm start`

## 📋 Workflow
1. **Branch:** Always use `feat/` or `fix/` branches.
2. **Pull Requests:** Open a PR to `main`.
3. **Review:** All changes must be approved.

## Security & Hardening
- **Security Headers:** Implemented via `helmet`.
- **Rate Limiting:** Global rate limiting active (100 req/15min).
- **Input Validation:** All user inputs are validated against Joi schemas.