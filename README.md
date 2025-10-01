# 📝 Task Manager Application

A **React + Vite** based **Task Manager Application** with **Tailwind CSS** and **Material-UI (MUI)**.  
This project is frontend-only and uses **localStorage** for persistence.  

---

## 🔹 Requirements & Features

### 1. Authentication (Mock Only)
- Login + Signup pages.
- Use **localStorage/sessionStorage** for mock authentication.
- Protect routes (redirect to login if not authenticated).

### 2. Task Management
- Create, update, delete tasks.
- Each task has:
  - `id`
  - `title`
  - `description`
  - `status` (completed/pending)
  - `category` (Work, Personal, Urgent)
  - `createdAt`
  - `updatedAt`
- Mark tasks as **completed/pending**.
- Persist tasks in **localStorage**.

### 3. Dashboard
- Show all tasks in a **list view**.
- Add a **progress bar** to show % of completed tasks.
- Filters:
  - Completed / Pending
  - By Category (Work, Personal, Urgent)

### 4. UI/UX
- Use **MUI components** with **Tailwind CSS** for styling & layout.
- Responsive design (desktop, tablet, mobile).
- Navbar with links:
  - Dashboard
  - Add Task
  - Logout
- Use **cards and modals** for tasks.

---

## 🔹 Tech Stack & Setup
- **React + Vite** (preferred, or CRA if needed).
- **Tailwind CSS** for styling.
- **MUI (Material-UI)** for UI components.
- **React Router** for navigation.
- **LocalStorage** for persisting tasks and authentication.

---

## 🔹 Project Structure

src/
├── assets/ # Images, icons if needed
├── components/ # Reusable components (Navbar, TaskCard, ProgressBar, etc.)
├── pages/ # Pages (Login, Signup, Dashboard, TaskForm, NotFound)
├── context/ # AuthContext, TaskContext (if using Context API)
├── hooks/ # Custom hooks (useAuth, useTasks)
├── utils/ # Helper functions
├── App.jsx
├── main.jsx
└── index.css


---

## 🔹 Deliverables
- ✅ Complete working **React app**.
- ✅ All features implemented as per requirements.
- ✅ Responsive and polished UI.
- ✅ Include **dummy seed data** for testing.

---