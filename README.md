# Ecommerce Frontend

A modern e-commerce frontend built with **React**, **TypeScript**, and **Vite**, styled with **Tailwind CSS (v4)** and **shadcn/ui**.

## 🏗️ Project Structure (Modular Architecture)

The project follows a **modular, feature-based architecture** to ensure clear separation of concerns between the **Admin Dashboard** and **User Facing Store**.

### 📂 `src/` (Source Code Root)

- **`admin/`**: All logic, pages, and components specific to the Admin Dashboard.
  - **`components/layout/`**: Admin-exclusive layout components (`Sidebar`, `Header`, `PageWrapper`).
  - **`features/`**: Admin-specific features (e.g., `dashboard`).
- **`user/`**: All logic, pages, and components specific to the Customer-facing store.
  - **`components/layout/`**: User-exclusive layout components.
  - **`features/`**: User-specific features (e.g., `auth`, `home`).
- **`components/`**: **Shared** UI components.
  - **`ui/`**: Atomic components managed by **shadcn/ui** (e.g., `Button`).
  - **`common/`**: Generic, stateless components used globally.
  - **`shared/`**: Shared view components (e.g., `NotFoundPage`).
- **`constants/`**: Shared static data (e.g., `menuItems`).
- **`assets/`**: Shared images, logos, and global assets.
- **`lib/`**: External library configurations and internal utility functions.
- **`routes/`**: Centralized application routing logic (`AppRoutes.tsx`).

### ⚙️ Key Configuration Files

- **`vite.config.ts`**: Vite configuration including dynamic **import aliases** (`@/`).
- **`tsconfig.app.json`**: TypeScript configuration for the application layer.
- **`eslint.config.js`**: Enhanced linting rules (ESLint + Prettier).
- **`.husky/`**: Pre-commit hooks for automated code quality checks (Lint-Staged).

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run dev server:**
   ```bash
   npm run dev
   ```
3. **Quality Checks:**
   ```bash
   npm run format  # Clear formatting with Prettier
   npm run lint    # Run ESLint checks
   ```
