import { useState, useEffect } from 'react';
import { Target, Plus, Trash2, CalendarClock, BookOpen } from 'lucide-react';
import { getMateriaHex } from '../utils/dateUtils';
import clsx from 'clsx';

// Calcula días restantes desde hoy hasta la fecha dada (positivo = futuro, 0 = hoy, negativo = pasado)
function calcDaysLeft(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateStr}T00:00:00`);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

const LS_KEY = 'uncoApp_metas_fijas';

function loadGoals() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) { /* ignore */ }
  return [];
}

function saveGoals(goals) {
  localStorage.setItem(LS_KEY, JSON.stringify(goals));
}

export default function FixedGoals({ data, darkMode }) {
  const [goals, setGoals] = useState(loadGoals);
  const [showForm, setShowForm] = useState(false);
  const [desc, setDesc] = useState('');
  const [selectedMat, setSelectedMat] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Persist goals whenever they change
  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  // Subjects from config
  const subjects = Object.entries(data.config.materias).map(([key, mat]) => ({
    key,
    name: mat.nombre,
    hex: getMateriaHex(key, data),
  }));

  // Pre-select first subject when form opens
  useEffect(() => {
    if (showForm) {
      setDesc('');
      setDate('');
      setTime('');
      setSelectedMat(subjects[0]?.key || '');
    }
  }, [showForm]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = desc.trim();
    if (!trimmed || !selectedMat || !date) return;
    const newGoal = {
      id: `goal_${Date.now()}`,
      mat: selectedMat,
      desc: trimmed,
      date,
      time: time || '',
    };
    setGoals(prev => [...prev, newGoal]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Sort: nearest deadline first, then future, then past
  const sortedGoals = [...goals].sort((a, b) => {
    const da = calcDaysLeft(a.date);
    const db = calcDaysLeft(b.date);
    // both future or today: sort ascending
    if (da >= 0 && db >= 0) return da - db;
    // both past: sort descending (most recent first)
    if (da < 0 && db < 0) return db - da;
    // future before past
    return da < 0 ? 1 : -1;
  });

  const getDaysLabel = (daysLeft) => {
    if (daysLeft === 0) return { text: '¡Hoy!', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800' };
    if (daysLeft === 1) return { text: 'Mañana', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800' };
    if (daysLeft > 1 && daysLeft <= 7) return { text: `${daysLeft}d`, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' };
    if (daysLeft > 7) return { text: `${daysLeft}d`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' };
    return { text: `${Math.abs(daysLeft)}d atrás`, color: 'text-slate-400', bg: 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700' };
  };

  return (
    <div className="glass-card p-4 md:p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-500 shrink-0" />
            Metas Fijas
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-300 font-medium mt-0.5">
            Fechas importantes de materias
          </p>
        </div>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className={clsx(
            "flex items-center justify-center w-8 h-8 rounded-xl transition-all shadow-sm",
            showForm
              ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rotate-45"
              : "bg-foreground text-background hover:opacity-80"
          )}
          title="Agregar meta"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="flex flex-col gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border"
          style={{ animation: 'slideDown 0.18s ease-out both' }}
        >
          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 mb-1">
              Descripción
            </label>
            <input
              type="text"
              autoFocus
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Ej: Parcial de SO, Entrega TP2..."
              className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 placeholder:text-slate-400"
              required
            />
          </div>

          {/* Materia */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 mb-1.5">
              Materia
            </label>
            <div className="flex flex-wrap gap-1.5">
              {subjects.map(s => {
                const isSelected = selectedMat === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSelectedMat(s.key)}
                    className={clsx(
                      'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all',
                      isSelected
                        ? 'shadow-sm scale-105'
                        : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400'
                    )}
                    style={isSelected ? { backgroundColor: `${s.hex}22`, borderColor: s.hex, color: darkMode ? '#fff' : '#0f172a' } : {}}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.hex }} />
                    {s.key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date + Time */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 dark:text-white dark:[color-scheme:dark]"
              />
            </div>
            <div className="w-28">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 mb-1">
                Hora
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 dark:text-white dark:[color-scheme:dark]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!desc.trim() || !selectedMat || !date}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-foreground text-background rounded-xl hover:opacity-90 disabled:opacity-30 transition-all"
            >
              <Plus className="w-3 h-3" />
              Guardar
            </button>
          </div>
        </form>
      )}

      {/* Goals list */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-0.5">
        {sortedGoals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 gap-2 opacity-50">
            <CalendarClock className="w-8 h-8 text-slate-400" />
            <p className="text-sm text-slate-400 italic text-center">
              Sin metas aún.<br />Agregá un parcial o entrega.
            </p>
          </div>
        )}

        {sortedGoals.map(goal => {
          const daysLeft = calcDaysLeft(goal.date);
          const matHex = getMateriaHex(goal.mat, data);
          const { text: daysText, color: daysColor, bg: daysBg } = getDaysLabel(daysLeft);
          const isPast = daysLeft < 0;

          return (
            <div
              key={goal.id}
              className={clsx(
                "group relative flex flex-col gap-1.5 px-3 py-2.5 rounded-xl border transition-all",
                isPast
                  ? "opacity-50 bg-slate-50/50 dark:bg-slate-900/20 border-transparent"
                  : "bg-card dark:bg-slate-900/40 border-border hover:border-slate-300 dark:hover:border-slate-600"
              )}
            >
              {/* Left color bar */}
              <div
                className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
                style={{ backgroundColor: matHex }}
              />

              <div className="flex items-start justify-between gap-2 pl-2">
                {/* Subject + description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider"
                      style={{ color: matHex }}
                    >
                      {goal.mat}
                    </span>
                    {goal.time && (
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                        · {goal.time}
                      </span>
                    )}
                  </div>
                  <p className={clsx(
                    "text-sm font-semibold leading-snug",
                    isPast
                      ? "text-slate-400 line-through"
                      : darkMode ? "text-white" : "text-slate-800"
                  )}>
                    {goal.desc}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {formatDisplayDate(goal.date)}
                  </p>
                </div>

                {/* Days counter badge */}
                <div className={clsx(
                  "flex flex-col items-center shrink-0 px-2 py-1.5 rounded-lg border text-center min-w-[44px]",
                  isPast
                    ? "bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
                    : daysBg
                )}>
                  <BookOpen className={clsx("w-3 h-3 mb-0.5", daysColor)} />
                  <span className={clsx("text-[11px] font-black leading-none", daysColor)}>
                    {daysText}
                  </span>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(goal.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all"
                title="Eliminar meta"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
