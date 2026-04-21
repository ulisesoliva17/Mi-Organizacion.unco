import { CheckCircle2, Circle } from 'lucide-react';

export default function HabitsTracker({ data, onToggleHabit }) {
  const habitos = data.habitos || {};

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Hábitos</h2>
      <div className="space-y-3">
        {Object.entries(habitos).map(([habitName, isDone]) => (
          <div 
            key={habitName}
            onClick={() => onToggleHabit(habitName)}
            className="flex items-center gap-3 p-3 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 transition-transform group-hover:scale-110" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors" />
            )}
            <span className={`font-medium transition-colors ${isDone ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
              {habitName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
