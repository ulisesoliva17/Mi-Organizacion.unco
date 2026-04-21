import { useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

export function useAppStore() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('uncoApp_data');
    if (stored) {
      return JSON.parse(stored);
    }
    return initialData;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('uncoApp_theme');
    if (stored) {
      return stored === 'dark';
    }
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

  const toggleHabit = (habitName) => {
    setData(prev => ({
      ...prev,
      habitos: {
        ...prev.habitos,
        [habitName]: !prev.habitos[habitName]
      }
    }));
  };

  const updateHito = (oldHito, newHito) => {
    setData(prev => {
      const isExisting = prev.hitos.find(h => h.fecha === oldHito.fecha && h.desc === oldHito.desc && h.mat === oldHito.mat);
      let newHitos = [...prev.hitos];
      if (isExisting) {
        newHitos = newHitos.map(h => 
          (h.fecha === oldHito.fecha && h.desc === oldHito.desc && h.mat === oldHito.mat) ? newHito : h
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
      hitos: prev.hitos.filter(h => !(h.fecha === hitoToDelete.fecha && h.desc === hitoToDelete.desc && h.mat === hitoToDelete.mat))
    }));
  };

  return {
    data,
    darkMode,
    toggleDarkMode,
    toggleHabit,
    updateHito,
    deleteHito
  };
}
