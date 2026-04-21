import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { getCategoryHex } from '../utils/dateUtils';
import clsx from 'clsx';

// All selectable categories for manual calendar tasks
const FIXED_HABIT_CATEGORIES = [
  { key: 'Limpieza', name: 'Limpieza', hex: '#38bdf8' },
  { key: 'Deporte',  name: 'Deporte',  hex: '#f97316' },
];

export default function AddTaskModal({ isOpen, date, onClose, onAdd, data, darkMode }) {
  const [taskName, setTaskName]         = useState('');
  const [selectedCat, setSelectedCat]   = useState('');
  const [categoryType, setCategoryType] = useState('materia'); // 'materia' | 'habito'

  // Build category lists from app data
  const materiaCategories = Object.entries(data.config.materias).map(([key, mat]) => ({
    key,
    name: key,
    hex: getCategoryHex(key, data),
  }));

  const habitCategories = FIXED_HABIT_CATEGORIES;

  // Auto-select first category of active type when the modal opens
  useEffect(() => {
    if (isOpen) {
      setTaskName('');
      const first =
        categoryType === 'materia'
          ? materiaCategories[0]?.key
          : habitCategories[0]?.key;
      setSelectedCat(first || '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // When user switches tab, pre-select first item
  const handleTabSwitch = (type) => {
    setCategoryType(type);
    const first =
      type === 'materia'
        ? materiaCategories[0]?.key
        : habitCategories[0]?.key;
    setSelectedCat(first || '');
  };

  if (!isOpen) return null;

  const activeCategories =
    categoryType === 'materia' ? materiaCategories : habitCategories;

  const selectedHex =
    activeCategories.find((c) => c.key === selectedCat)?.hex || '#64748b';

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = taskName.trim();
    if (!name || !selectedCat) return;
    onAdd({ date, mat: selectedCat, desc: name, categoryType });
    onClose();
  };

  // Format display date
  const [year, month, day] = (date || '').split('-');
  const displayDate = date
    ? `${day}/${month}/${year}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border p-6 shadow-2xl relative"
        style={{ animation: 'modalIn 0.18s ease-out both' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full transition-colors duration-200"
              style={{ backgroundColor: selectedHex }}
            />
            <h2 className="text-lg font-bold tracking-tight">Nueva Tarea</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {displayDate}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task name input */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              Nombre de la tarea
            </label>
            <input
              type="text"
              autoFocus
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Ej: Estudiar Parcial, TP3..."
              className="w-full px-3 py-2.5 text-sm bg-transparent border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 placeholder:text-slate-400"
              required
            />
          </div>

          {/* Category type tabs */}
          <div>
            <label className="block text-sm font-semibold mb-2">Categoría</label>
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3">
              {['materia', 'habito'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTabSwitch(type)}
                  className={clsx(
                    'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
                    categoryType === type
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  )}
                >
                  {type === 'materia' ? 'Materia' : 'Hábito'}
                </button>
              ))}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {activeCategories.map((cat) => {
                const isSelected = selectedCat === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCat(cat.key)}
                    className={clsx(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all',
                      isSelected
                        ? 'shadow-md scale-105'
                        : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'
                    )}
                    style={
                      isSelected
                        ? {
                            backgroundColor: `${cat.hex}22`,
                            borderColor: cat.hex,
                            color: darkMode ? '#ffffff' : '#0f172a',
                          }
                        : {}
                    }
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.hex }}
                    />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview chip */}
          {taskName.trim() && selectedCat && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border-l-4 transition-all"
              style={{
                backgroundColor: `${selectedHex}18`,
                borderColor: selectedHex,
                color: darkMode ? '#ffffff' : '#0f172a',
              }}
            >
              <span
                className="font-black text-sm"
                style={{ color: selectedHex }}
              >
                {selectedCat}
              </span>
              <span className="opacity-80">{taskName.trim()}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!taskName.trim() || !selectedCat}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-foreground text-background rounded-xl hover:opacity-90 disabled:opacity-30 transition-all"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
