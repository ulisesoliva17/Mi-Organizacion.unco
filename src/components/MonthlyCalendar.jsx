import { useMemo, useState } from 'react';
import { getEventsForDate, formatShortDateEs, getMateriaHex, getDynamicSubjectStyles, isImportantEvent } from '../utils/dateUtils';
import clsx from 'clsx';
import { isToday, isBefore, startOfDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus, AlertTriangle } from 'lucide-react';
import AddTaskModal from './AddTaskModal';
import DayDetailsModal from './DayDetailsModal';

const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function MonthlyCalendar({ data, darkMode, onEventClick, onAddTask }) {
  const today = startOfDay(new Date());

  // Strict calendar-month view: every day of the CURRENT month, nothing beyond it.
  const days = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const monthLabel = format(today, "MMMM yyyy", { locale: es });

  // Pad the grid so day 1 falls on the right weekday column (Mon=0) and the
  // last row is completed — a Gregorian month grid is always 4-6 rows, so
  // this alone keeps the view compact without any extra height cap.
  const leadingEmptyDays = Array.from({ length: (getDay(days[0]) + 6) % 7 });
  const trailingEmptyDays = Array.from({
    length: (7 - ((leadingEmptyDays.length + days.length) % 7)) % 7
  });

  // Modal state — stores the ISO date string of the selected day
  const [modalDate, setModalDate] = useState(null);
  const [dayDetailsDate, setDayDetailsDate] = useState(null);

  const handleAddClick = (e, day) => {
    e.stopPropagation(); // Don't bubble to day-cell click
    setModalDate(format(day, 'yyyy-MM-dd'));
  };

  const handleModalAdd = (taskData) => {
    onAddTask(taskData);
  };

  return (
    <div className="glass-card p-4 md:p-6 flex flex-col h-full w-full">
      {/* Header + Legend */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight capitalize">
          Calendario <span className="text-slate-400 dark:text-slate-500 font-semibold">· {monthLabel}</span>
        </h2>

        <div className="flex flex-wrap gap-2 md:gap-3">
          {Object.entries(data.config.materias).map(([matKey, matData]) => {
            const hex = getMateriaHex(matKey, data);
            return (
              <div key={matKey} className="flex items-center gap-1.5 text-[10px] md:text-sm font-semibold">
                <span
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-slate-700 dark:text-white">
                  {matKey}
                </span>
              </div>
            );
          })}
          {/* Habit legend items */}
          <div className="flex items-center gap-1.5 text-[10px] md:text-sm font-semibold">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0" style={{ backgroundColor: '#38bdf8' }} />
            <span className="text-slate-700 dark:text-slate-300">Limpieza</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] md:text-sm font-semibold">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0" style={{ backgroundColor: '#f97316' }} />
            <span className="text-slate-700 dark:text-slate-300">Deporte</span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="w-full overflow-hidden pb-2">
        <div className="w-full">
          {/* Week-day header row */}
          <div className="grid grid-cols-7 gap-1.5 md:gap-4 mb-3">
            {WEEK_DAYS.map((dayName, idx) => (
              <div
                key={idx}
                className="text-center text-[9px] md:text-sm font-bold text-slate-400 uppercase tracking-wider"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Days Grid — a strict calendar month, always 4-6 rows, no extra scroll needed */}
          <div className="grid grid-cols-7 gap-1.5 md:gap-4">
            {leadingEmptyDays.map((_, i) => (
              <div
                key={`empty-lead-${i}`}
                className="h-[170px] md:h-[260px] rounded-lg md:rounded-xl bg-[#DCD0B9]/60 dark:!bg-card border border-transparent"
              />
            ))}

            {days.map((day, i) => {
              const events = getEventsForDate(day, data);
              const isTodayDate = isToday(day);
              const isPastDate = isBefore(day, today);

              return (
                <div
                  key={i}
                  onClick={() => setDayDetailsDate(day)}
                  className={clsx(
                    'group h-[170px] md:h-[260px] overflow-hidden cursor-pointer border border-border rounded-lg md:rounded-xl p-1.5 md:p-4 flex flex-col gap-1.5 md:gap-3 transition-all hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-sm',
                    isTodayDate
                      ? 'ring-2 ring-foreground bg-[#E3D5BE] dark:bg-slate-800/50'
                      : 'bg-[#EAE0CB] dark:bg-slate-900',
                    isPastDate && !isTodayDate && 'opacity-50 saturate-50'
                  )}
                >
                  {/* Day header: date label + add button */}
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] md:text-base font-bold text-slate-500 dark:text-slate-300">
                      {formatShortDateEs(day)}
                    </div>
                    {/* + button – always visible on today, hover on others or touch on mobile */}
                    <button
                      onClick={(e) => handleAddClick(e, day)}
                      title="Agregar tarea"
                      className={clsx(
                        'flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full transition-all hover:scale-110 active:scale-95',
                        isTodayDate
                          ? 'bg-foreground text-background opacity-90 hover:opacity-100'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 opacity-50 hover:opacity-100 hover:bg-slate-300 dark:hover:bg-slate-600'
                      )}
                    >
                      <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                    </button>
                  </div>

                  <div className="no-scrollbar flex flex-col gap-1.5 md:gap-2.5 flex-1 overflow-y-auto">
                    {events.map((ev, j) => {
                      const styles = getDynamicSubjectStyles(ev.mat, data, darkMode);
                      const important = isImportantEvent(ev);
                      return (
                        <div
                          key={j}
                          onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
                          className={clsx(
                            "relative text-[9px] md:text-sm leading-tight px-1.5 py-1 md:px-2.5 md:py-2 rounded-md cursor-pointer font-bold shadow-sm transition-transform hover:scale-[1.02] truncate md:whitespace-normal",
                            important
                              ? "border-2 border-red-500 dark:border-red-400"
                              : !darkMode && "border-l md:border-l-4"
                          )}
                          style={{
                            backgroundColor: styles.bg,
                            color: styles.text,
                            borderColor: important ? undefined : styles.border
                          }}
                        >
                          {important && (
                            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950 shadow text-white">
                              <AlertTriangle className="w-2 h-2 md:w-2.5 md:h-2.5" strokeWidth={3} />
                            </span>
                          )}
                          <div className="hidden md:flex items-baseline gap-1">
                            <span className="font-black truncate">{important ? `${ev.mat} · ${ev.tipo}` : ev.mat}</span>
                            {ev.hora && ev.hora !== 'Todo el día' && (
                              <span className="ml-auto shrink-0 whitespace-nowrap text-[11px] font-semibold opacity-90">
                                {ev.hora}
                              </span>
                            )}
                          </div>
                          <div className="md:whitespace-normal break-words font-semibold opacity-90 line-clamp-1 md:line-clamp-none">{ev.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {trailingEmptyDays.map((_, i) => (
              <div
                key={`empty-trail-${i}`}
                className="h-[170px] md:h-[260px] rounded-lg md:rounded-xl bg-[#DCD0B9]/60 dark:!bg-card border border-transparent"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={!!modalDate}
        date={modalDate}
        onClose={() => setModalDate(null)}
        onAdd={handleModalAdd}
        data={data}
        darkMode={darkMode}
      />

      {/* Day Details Modal */}
      <DayDetailsModal
        isOpen={!!dayDetailsDate}
        date={dayDetailsDate}
        onClose={() => setDayDetailsDate(null)}
        data={data}
        darkMode={darkMode}
        onEventClick={onEventClick}
        onAddTask={(d) => setModalDate(format(d, 'yyyy-MM-dd'))}
      />
    </div>
  );
}
