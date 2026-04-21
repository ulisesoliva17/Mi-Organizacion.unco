import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Sparkles, Timer, ChevronDown } from 'lucide-react';
import { getRandomTask } from '../data/taskGenerator';
import { getCategoryHex, HABIT_CATEGORIES } from '../utils/dateUtils';
import clsx from 'clsx';

export default function HabitsTracker({ data, onToggleHabit, onAddHabit, onAddGeneratedTask, onRemoveHabit }) {
  const habitos = Array.isArray(data.habitos) ? data.habitos : [];
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [lastGenerated, setLastGenerated] = useState(null);
  const [animating, setAnimating] = useState(false);

  const subjects = Object.keys(data.config.materias);
  const categories = [
    { key: 'general', name: 'General', color: '#64748b' },
    { key: 'limpieza', name: 'Limpieza', color: '#38bdf8' },
    { key: 'deporte', name: 'Deporte', color: '#f97316' },
    ...subjects.map(s => ({ key: s, name: s, color: getCategoryHex(s) }))
  ];

  const handleAddManual = (e) => {
    e.preventDefault();
    const name = newTaskName.trim();
    if (!name) return;
    onAddHabit(name, selectedCategory);
    setNewTaskName('');
  };

  const handleGenerate = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    const task = getRandomTask();
    setLastGenerated(task);
    onAddGeneratedTask(task);
  };

  return (
    <div className="glass-card p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-0.5">Hábitos</h2>
          <p className="text-xs text-slate-400">Tachá lo que completaste hoy</p>
        </div>
      </div>

      {/* Legend - Only Limpieza and Deporte as requested */}
      <div className="flex gap-4 px-1 py-1 border-b border-border/50">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          Limpieza
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Deporte
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className={clsx(
          "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md",
          "bg-gradient-to-br from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500 hover:shadow-lg active:scale-95",
          animating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
        )}
      >
        <Sparkles className="w-4 h-4 shrink-0" />
        ¿Qué puedo hacer en 10 min?
      </button>

      {/* Preview of last generated */}
      {lastGenerated && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800">
          <Timer className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
          <p className="text-xs text-violet-700 dark:text-violet-300 leading-snug">{lastGenerated}</p>
        </div>
      )}

      {/* Habit list */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[500px] pr-1">
        {habitos.length === 0 && (
          <p className="text-sm text-slate-400 italic text-center py-4">
            Sin hábitos aún.
          </p>
        )}
        {habitos.map((habit) => {
          const categoryColor = getCategoryHex(habit.category || 'general');
          return (
            <div
              key={habit.id}
              className={clsx(
                "group flex items-start gap-3 px-3 py-2.5 rounded-xl border transition-all cursor-pointer",
                habit.done
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-border'
              )}
            >
              {/* Category indicator bar */}
              <div 
                className="w-1 self-stretch rounded-full shrink-0" 
                style={{ backgroundColor: categoryColor }}
              />

              {/* Toggle checkbox */}
              <button
                onClick={() => onToggleHabit(habit.id)}
                className="mt-0.5 shrink-0"
              >
                {habit.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 transition-transform group-hover:scale-110" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300" />
                )}
              </button>

              {/* Task name */}
              <span
                onClick={() => onToggleHabit(habit.id)}
                className={clsx(
                  "flex-1 text-sm leading-snug transition-colors select-none",
                  habit.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'
                )}
              >
                {habit.type === 'generated' && (
                  <span className="inline-block mr-1 text-violet-500 text-[10px] font-bold uppercase tracking-wide">
                    10min ·{' '}
                  </span>
                )}
                {habit.name}
              </span>

              {/* Delete button */}
              <button
                onClick={() => onRemoveHabit(habit.id)}
                className="shrink-0 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add manual task */}
      <div className="pt-2 border-t border-border space-y-2">
        <form onSubmit={handleAddManual} className="flex gap-2">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 text-sm px-3 py-2 rounded-xl border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!newTaskName.trim()}
            className="p-2 rounded-xl bg-foreground text-background hover:opacity-80 disabled:opacity-30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
        
        {/* Category selector */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={clsx(
                "px-2 py-1 rounded-md text-[10px] font-bold border transition-all uppercase tracking-tight",
                selectedCategory === cat.key 
                  ? "bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white" 
                  : "bg-transparent border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
