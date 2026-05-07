# SkillSync Progress Log

## 🏁 Current Status: Phase 5 Completed
**Date:** May 7, 2026

## 🏗️ Architecture (Phase 2)
- **Framework:** Express + `routing-controllers`
- **DI Container:** `typedi` (Configured in `src/config/container.ts`)
- **Layers:** 
  - **Controllers:** Decorator-based (e.g., `UserController`, `AuthController`)
  - **Services:** Business logic (e.g., `UserService`)
  - **Repositories:** Data access (e.g., `UserRepository`)
- **Data Source:** TypeORM (PostgreSQL)

## 🔑 Identity & Security (Phase 3)
- **Password Hashing:** `bcrypt` (10 rounds) used in `UserService`.
- **Authentication:** `jsonwebtoken` (JWT) with 7-day expiration.
- **Protected Routes:** `@Authorized()` decorator enabled.
- **Security Guard:** `authorizationChecker` moved to `src/utils/auth.util.ts`.
- **Entity Security:** `password` column set to `select: false` (Hidden by default).

## 🛡️ Data Integrity (Phase 4)
- **Validation:** Using `class-validator` (Built-in to `routing-controllers`).
- **DTOs:** Created `RegisterUserDTO` and `LoginUserDTO` for safe input.
- **Relationships:**
  - **One-to-One:** User ↔️ Profile (Bio, Avatar, JSONB Skills).
  - **One-to-Many:** User ↔️ Roadmaps.
- **JSONB:** Using high-performance JSONB for dynamic user skills.

## 🛠️ Error Resilience (Phase 5)
- **Global Error Handler:** Created `CustomErrorHandlerMiddleware` to catch all app errors.
- **Consistent Format:** All errors now return a clean JSON object (status, name, message, errors).
- **Security:** Stack traces are hidden in production and only shown in development.

## 🐳 Docker Workflow ("Pure Docker")
- **Service Name:** `api`
- **Command:** `sh -c "npm install && npm run dev"` (Auto-installs on start).
- **Rule:** To add packages, run: `docker-compose exec api npm install <pkg>`.
- **Note:** Run `npm install` locally once to satisfy editor (VS Code) type-checking.

## ⏭️ Next Steps
- [ ] Phase 6: Skill & Profile Features (CRUD for Profile/Skills)
- [ ] Phase 7: Roadmap Management
