import { useMemo } from 'react';
import { getCalendarDays, getEventsForDate, formatShortDateEs, getColorsForMateria } from '../utils/dateUtils';
import clsx from 'clsx';
import { isToday, isBefore, startOfDay, parseISO as dateFnsParseISO } from 'date-fns';

export default function MonthlyCalendar({ data, onEventClick }) {
  const startDate = parseISO(data.config.fecha_inicio);
  const days = useMemo(() => getCalendarDays(startDate, 30), [startDate]);

  return (
    <div className="glass-card p-6 flex flex-col h-full w-full">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Calendario</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 overflow-y-auto w-full">
        {days.map((day, i) => {
          const events = getEventsForDate(day, data);
          const isPast = isBefore(day, startOfDay(new Date()));
          const isTodayDate = isToday(day);

          return (
            <div 
              key={i} 
              className={clsx(
                "min-h-[120px] border border-border rounded-xl p-3 flex flex-col gap-2 transition-all hover:border-slate-300 dark:hover:border-slate-600",
                isTodayDate ? "ring-2 ring-foreground bg-slate-50 dark:bg-slate-800/50" : "bg-card",
                isPast && "opacity-60"
              )}
            >
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {formatShortDateEs(day)}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {events.map((ev, j) => {
                  const colors = getColorsForMateria(ev.mat, data);
                  // Usamos color de fondo sólido y texto claro (blanco/claro) para mejor visibilidad directa
                  return (
                    <div 
                      key={j}
                      onClick={() => onEventClick(ev)}
                      className={clsx(
                        "text-xs leading-tight px-2 py-1.5 rounded-md cursor-pointer transition-transform hover:scale-[1.02]",
                        "text-white shadow-sm font-medium",
                        colors.bg
                      )}
                      style={{ 
                        backgroundColor: `var(--color-${data.config.materias[ev.mat]?.color})`
                      }}
                    >
                      <div className="font-bold opacity-90">{ev.mat}</div>
                      <div className="whitespace-normal break-words opacity-100">{ev.desc}</div>
                      {ev.hora && <div className="text-[10px] mt-1 opacity-80">{ev.hora}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Utility to parse ISO for the component
function parseISO(dateString) {
  return dateFnsParseISO(`${dateString}T00:00:00`);
}
