import { useMemo } from 'react';
import { getCalendarDays, getEventsForDate, formatShortDateEs, getMateriaHex, getDynamicSubjectStyles } from '../utils/dateUtils';
import clsx from 'clsx';
import { isToday, isBefore, startOfDay, parseISO as dateFnsParseISO, getDay } from 'date-fns';

const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function MonthlyCalendar({ data, darkMode, onEventClick }) {
  const startDate = parseISO(data.config.fecha_inicio);
  const days = useMemo(() => getCalendarDays(startDate, 30), [startDate]);

  // Pad the grid so the first day falls on the correct weekday column (Mon=0)
  const startDayOfWeek = (getDay(startDate) + 6) % 7;
  const emptyDays = Array.from({ length: startDayOfWeek });

  return (
    <div className="glass-card p-4 md:p-6 flex flex-col h-full w-full">
      {/* Header + Legend */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Calendario</h2>

        <div className="flex flex-wrap gap-2 md:gap-3">
          {Object.entries(data.config.materias).map(([matKey, matData]) => {
            const hex = getMateriaHex(matKey, data);
            return (
              <div key={matKey} className="flex items-center gap-1.5 text-[10px] md:text-sm font-semibold">
                <span
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-slate-700 dark:text-slate-300">
                  {matKey}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Container with Horizontal Scroll on Mobile */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[800px] md:min-w-0">
          {/* Week-day header row */}
          <div className="grid grid-cols-7 gap-2 md:gap-3 mb-3">
            {WEEK_DAYS.map((dayName, idx) => (
              <div
                key={idx}
                className="text-center text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-wider"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {emptyDays.map((_, i) => (
              <div
                key={`empty-${i}`}
                className="min-h-[100px] md:min-h-[120px] rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-transparent"
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
                    'min-h-[100px] md:min-h-[120px] border border-border rounded-xl p-2 md:p-3 flex flex-col gap-1 md:gap-2 transition-all hover:border-slate-300 dark:hover:border-slate-600',
                    isTodayDate
                      ? 'ring-2 ring-foreground bg-slate-50 dark:bg-slate-800/50'
                      : 'bg-card',
                    isPast && 'opacity-60'
                  )}
                >
                  <div className="text-[10px] md:text-sm font-bold text-slate-500 dark:text-slate-400">
                    {formatShortDateEs(day)}
                  </div>

                  <div className="flex flex-col gap-1.5 md:gap-2 flex-1">
                    {events.map((ev, j) => {
                      const styles = getDynamicSubjectStyles(ev.mat, data, darkMode);
                      return (
                        <div
                          key={j}
                          onClick={() => onEventClick(ev)}
                          className={clsx(
                            "text-[10px] md:text-xs leading-tight px-1.5 py-1 md:px-2 md:py-1.5 rounded-md cursor-pointer font-bold shadow-sm transition-transform hover:scale-[1.02]",
                            !darkMode && "border-l-2 md:border-l-4"
                          )}
                          style={{ 
                            backgroundColor: styles.bg, 
                            color: styles.text,
                            borderColor: styles.border
                          }}
                        >
                          <div className="font-black">{ev.mat}</div>
                          <div className="whitespace-normal break-words font-semibold opacity-90 line-clamp-2 md:line-clamp-none">{ev.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function parseISO(dateString) {
  return dateFnsParseISO(`${dateString}T00:00:00`);
}
