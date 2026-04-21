import { useMemo } from 'react';
import { getCalendarDays, getEventsForDate, formatShortDateEs, getMateriaHex } from '../utils/dateUtils';
import clsx from 'clsx';
import { isToday, isBefore, startOfDay, parseISO as dateFnsParseISO, getDay } from 'date-fns';

const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function MonthlyCalendar({ data, onEventClick }) {
  const startDate = parseISO(data.config.fecha_inicio);
  const days = useMemo(() => getCalendarDays(startDate, 30), [startDate]);

  // Pad the grid so the first day falls on the correct weekday column (Mon=0)
  const startDayOfWeek = (getDay(startDate) + 6) % 7;
  const emptyDays = Array.from({ length: startDayOfWeek });

  return (
    <div className="glass-card p-6 flex flex-col h-full w-full">
      {/* Header + Legend */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Calendario</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(data.config.materias).map(([matKey, matData]) => {
            const hex = getMateriaHex(matKey, data);
            return (
              <div key={matKey} className="flex items-center gap-1.5 text-sm font-semibold">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-slate-700 dark:text-slate-300">
                  {matKey} – {matData.nombre}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Week-day header row */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {WEEK_DAYS.map((dayName, idx) => (
          <div
            key={idx}
            className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-3">
        {emptyDays.map((_, i) => (
          <div
            key={`empty-${i}`}
            className="min-h-[120px] rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-transparent"
          />
        ))}

        {days.map((day, i) => {
          const events = getEventsForDate(day, data);
          const isPast = isBefore(day, startOfDay(new Date()));
          const isTodayDate = isToday(day);

          return (
            <div
              key={i}
              className={clsx(
                'min-h-[120px] border border-border rounded-xl p-3 flex flex-col gap-2 transition-all hover:border-slate-300 dark:hover:border-slate-600',
                isTodayDate
                  ? 'ring-2 ring-foreground bg-slate-50 dark:bg-slate-800/50'
                  : 'bg-card',
                isPast && 'opacity-60'
              )}
            >
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {formatShortDateEs(day)}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {events.map((ev, j) => {
                  const hex = getMateriaHex(ev.mat, data);
                  return (
                    <div
                      key={j}
                      onClick={() => onEventClick(ev)}
                      className="text-xs leading-tight px-2 py-1.5 rounded-md cursor-pointer font-medium text-white shadow-sm transition-transform hover:scale-[1.02] hover:brightness-110"
                      style={{ backgroundColor: hex }}
                    >
                      <div className="font-bold">{ev.mat}</div>
                      <div className="whitespace-normal break-words">{ev.desc}</div>
                      {ev.hora && (
                        <div className="text-[10px] mt-1 opacity-90">{ev.hora}</div>
                      )}
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

function parseISO(dateString) {
  return dateFnsParseISO(`${dateString}T00:00:00`);
}
