import { useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

// Migrate old habitos format (plain object) to new array format
function migrateHabitos(habitos) {
  if (Array.isArray(habitos)) return habitos;
  // Old format: { "Deporte": false, "Limpieza del día": false }
  return Object.entries(habitos).map(([name, done]) => ({
    id: name,
    name,
    done,
    type: 'manual',
    category: name.toLowerCase().includes('deporte') ? 'deporte' : 
              name.toLowerCase().includes('limpieza') ? 'limpieza' : 'general'
  }));
}

function getInitialData() {
  const stored = localStorage.getItem('uncoApp_data');
  if (stored) {
    const parsed = JSON.parse(stored);
    return { ...parsed, habitos: migrateHabitos(parsed.habitos) };
  }
  const base = { ...initialData };
  base.habitos = migrateHabitos(base.habitos);
  return base;
}

export function useAppStore() {
  const [data, setData] = useState(getInitialData);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('uncoApp_theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('uncoApp_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('uncoApp_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Toggle habit done state by id
  const toggleHabit = (id) => {
    setData(prev => ({
      ...prev,
      habitos: prev.habitos.map(h => h.id === id ? { ...h, done: !h.done } : h),
    }));
  };

  // Add a new manual habit with category
  const addHabit = (name, category = 'general') => {
    const id = `manual_${Date.now()}`;
    setData(prev => ({
      ...prev,
      habitos: [...prev.habitos, { id, name, done: false, type: 'manual', category }],
    }));
  };

  // Add a generated 10-min task
  const addGeneratedTask = (name) => {
    const id = `gen_${Date.now()}`;
    setData(prev => ({
      ...prev,
      habitos: [...prev.habitos, { id, name, done: false, type: 'generated' }],
    }));
  };

  // Remove a habit by id
  const removeHabit = (id) => {
    setData(prev => ({
      ...prev,
      habitos: prev.habitos.filter(h => h.id !== id),
    }));
  };

  const updateHito = (oldHito, newHito) => {
    setData(prev => {
      const isExisting = prev.hitos.find(
        h => h.fecha === oldHito.fecha && h.desc === oldHito.desc && h.mat === oldHito.mat
      );
      let newHitos = [...prev.hitos];
      if (isExisting) {
        newHitos = newHitos.map(h =>
          h.fecha === oldHito.fecha && h.desc === oldHito.desc && h.mat === oldHito.mat
            ? newHito
            : h
        );
      } else {
        newHitos.push(newHito);
      }
      return { ...prev, hitos: newHitos };
    });
  };

  const deleteHito = (hitoToDelete) => {
    setData(prev => ({
      ...prev,
      hitos: prev.hitos.filter(
        h => !(h.fecha === hitoToDelete.fecha && h.desc === hitoToDelete.desc && h.mat === hitoToDelete.mat)
      ),
    }));
  };

  // Add a manually-created task from the calendar.
  // It is stored as a hito so getEventsForDate picks it up automatically
  // in both MonthlyCalendar and FocusToday.
  const addManualTask = ({ date, mat, desc }) => {
    setData(prev => ({
      ...prev,
      hitos: [...prev.hitos, { fecha: date, mat, desc, isManual: true }],
    }));
  };

  return {
    data,
    darkMode,
    toggleDarkMode,
    toggleHabit,
    addHabit,
    addGeneratedTask,
    removeHabit,
    updateHito,
    deleteHito,
    addManualTask,
  };
}
