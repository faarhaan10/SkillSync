# SkillSync Progress Log

## 🏁 Current Status: Phase 3 Completed
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

## 🐳 Docker Workflow ("Pure Docker")
- **Service Name:** `api`
- **Command:** `sh -c "npm install && npm run dev"` (Auto-installs on start).
- **Rule:** To add packages, run: `docker-compose exec api npm install <pkg>`.
- **Note:** Run `npm install` locally once to satisfy editor (VS Code) type-checking.

## ⏭️ Next Steps
- [ ] Phase 4: Validation (class-validator & class-transformer)
- [ ] Phase 5: Global Error Handling Middleware
- [ ] Phase 6: Skill/Profile Features
