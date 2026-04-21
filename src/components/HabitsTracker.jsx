import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Sparkles, Timer } from 'lucide-react';
import { getRandomTask } from '../data/taskGenerator';

export default function HabitsTracker({ data, onToggleHabit, onAddHabit, onAddGeneratedTask, onRemoveHabit }) {
  const habitos = Array.isArray(data.habitos) ? data.habitos : [];
  const [newTaskName, setNewTaskName] = useState('');
  const [lastGenerated, setLastGenerated] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleAddManual = (e) => {
    e.preventDefault();
    const name = newTaskName.trim();
    if (!name) return;
    onAddHabit(name);
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
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-0.5">Hábitos</h2>
        <p className="text-xs text-slate-400">Tachá lo que completaste hoy</p>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm
          bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md
          hover:from-violet-500 hover:to-blue-500 hover:shadow-lg
          active:scale-95 transition-all duration-200
          ${animating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
        `}
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
            Sin hábitos aún. ¡Agregá uno o generá una tarea de 10 min!
          </p>
        )}
        {habitos.map((habit) => (
          <div
            key={habit.id}
            className={`
              group flex items-start gap-3 px-3 py-2.5 rounded-xl border border-border 
              transition-all cursor-pointer
              ${habit.done
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            {/* Toggle checkbox */}
            <button
              onClick={() => onToggleHabit(habit.id)}
              className="mt-0.5 shrink-0"
              aria-label="Marcar como completado"
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
              className={`flex-1 text-sm leading-snug transition-colors select-none ${
                habit.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'
              }`}
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
              aria-label="Eliminar hábito"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add manual task */}
      <form onSubmit={handleAddManual} className="flex gap-2 pt-2 border-t border-border">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Nueva tarea (ej. Fútbol)"
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!newTaskName.trim()}
          className="p-2 rounded-xl bg-foreground text-background hover:opacity-80 disabled:opacity-30 transition-all"
          aria-label="Agregar tarea"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
