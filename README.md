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

## 🏗 Frontend Architecture
This project uses a modern, type-safe stack.
- **State Management:** Managed via [Zustand](https://zustand-demo.pmnd.rs/). Auth state is centralized in `src/store/useAuthStore.ts` and persists automatically.
- **Type Safety:** The project is migrating to **TypeScript**. All new components should be written in `.tsx`.
- **Resilience:** A global `ErrorBoundary` is implemented to catch and gracefully handle UI crashes.

## 🚀 Development Guidelines
- **TypeScript:** When adding new features, please define interfaces for API responses and component props.
- **State:** Use `useAuthStore` for global user data. Avoid direct usage of `localStorage`.
- **Error Handling:** If you create a high-risk component, wrap it in the `ErrorBoundary`.