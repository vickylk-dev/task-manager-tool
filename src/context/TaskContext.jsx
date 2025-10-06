import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TASKS_KEY = 'tm_tasks_v1';

const TaskContext = createContext(null);

function generateId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {}
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(TASKS_KEY) : null;
    if (!stored) {
      const now = new Date().toISOString();
      return [
        {
          id: generateId(),
          title: 'Finish project proposal',
          description: 'Draft and review the project proposal for the new client.',
          status: 'pending',
          category: 'Work',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: generateId(),
          title: 'Buy groceries',
          description: 'Milk, eggs, vegetables, cereal',
          status: 'pending',
          category: 'Personal',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: generateId(),
          title: 'Server patch',
          description: 'Apply critical security updates',
          status: 'completed',
          category: 'Urgent',
          createdAt: now,
          updatedAt: now,
        },
      ];
    }
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const now = new Date().toISOString();
    setTasks((prev) => [
      {
        id: generateId(),
        title: task.title,
        description: task.description || '',
        status: task.status || 'pending',
        category: task.category || 'Work',
        attachment: task.attachment || null,
        createdAt: now,
        updatedAt: now,
      },
      ...prev,
    ]);
  };

  const updateTask = (id, updates) => {
    const now = new Date().toISOString();
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, ...updates, updatedAt: now } : t));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const value = useMemo(() => ({ tasks, addTask, updateTask, deleteTask }), [tasks]);

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}

