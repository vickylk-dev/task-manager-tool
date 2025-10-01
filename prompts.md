# Task Manager Application Prompt

## Main Prompt
You are an expert React developer. Build a **frontend-only Task Manager Application** using **React + Vite (preferred)** with **Tailwind CSS** and **Material-UI (MUI)**. Follow **best practices**, maintain a **clean folder structure**, and create a **responsive UI/UX**.

---

## Requirements & Features

### Authentication (Mock Only)
- Login and Signup pages.
- Use `localStorage` or `sessionStorage` for mock authentication (no backend).
- Protect routes: redirect to login if not authenticated.

### Task Management
- Create, update, and delete tasks.
- Each task should have:
id, title, description, status (completed/pending), category (Work, Personal, Urgent), createdAt, updatedAt

- Mark tasks as completed or pending.
- Persist tasks in `localStorage`.

### Dashboard
- Show all tasks in a **list view**.
- Add a **progress bar** to show percentage of completed tasks.
- Filters:
- By **status**: Completed / Pending
- By **category**: Work, Personal, Urgent

### UI/UX
- Use **MUI components** with **Tailwind CSS** for styling and layout.
- Responsive design: **desktop, tablet, mobile**.
- Navbar with links: Dashboard, Add Task, Logout.
- Use **nice cards** and **modals** for tasks.

---

## Tech Stack & Setup
- **React + Vite** (or CRA if needed)
- **Tailwind CSS** for styling
- **MUI (Material-UI)** for UI components
- **React Router** for navigation
- **LocalStorage** for persisting tasks and authentication

---

## Project Structure
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

## Deliverables
- Complete working React app.
- All features implemented as per requirements.
- Responsive and polished UI.
- Include **dummy seed data** for testing.

---

## Additional Prompts
- Implement **search functionality** to filter tasks by title or description.
- Add **task sorting** (by date created, updated, or alphabetical order).
- Include **task priority field** (High, Medium, Low) and allow sorting/filtering by priority.
- Provide **multi-select bulk actions**: delete, change status, change category.
- Implement **advanced filters and sorting** in the Dashboard: filter by status, category, date range; sort by creation date, priority, or title. Use **MUI Select/Autocomplete** components and **Tailwind CSS** for layout.
- Show **visual priority indicators** (colored tags) for tasks. Allow sorting by priority.
- Create **reusable modal and form components** for adding/editing tasks. Ensure forms are **validated**, responsive, and integrated with **context/hooks**.
- Make all pages **fully responsive** using **Tailwind breakpoints** and **MUI Grid/Flex** components. Test layouts for **desktop, tablet, and mobile**. Ensure **task cards and modals resize gracefully**.
- Create a **dummy task generator function** to populate `localStorage` with random tasks for testing. Include random:
  - Titles
  - Descriptions
  - Status
  - Categories
  - CreatedAt / UpdatedAt timestamps

---
