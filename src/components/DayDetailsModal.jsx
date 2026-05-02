import { X, Clock, MapPin, Plus } from 'lucide-react';
import { getEventsForDate, formatShortDateEs, getDynamicSubjectStyles } from '../utils/dateUtils';
import clsx from 'clsx';

export default function DayDetailsModal({ isOpen, date, onClose, data, darkMode, onEventClick, onAddTask }) {
  if (!isOpen || !date) return null;

  const events = getEventsForDate(date, data);

  const handleEventClick = (ev) => {
    onClose();
    onEventClick(ev);
  };

  const handleAddClick = () => {
    onClose();
    onAddTask(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="glass-card w-full max-w-md p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Tareas del {formatShortDateEs(date)}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {events.length} {events.length === 1 ? 'evento programado' : 'eventos programados'}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {events.length === 0 ? (
            <p className="text-sm text-slate-500 italic text-center py-4">No hay tareas para este día.</p>
          ) : (
            events.map((ev, i) => {
              const styles = getDynamicSubjectStyles(ev.mat, data, darkMode);
              return (
                <div 
                  key={i} 
                  onClick={() => handleEventClick(ev)}
                  className="group flex gap-3 p-3 rounded-xl border border-border bg-card dark:bg-slate-900 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  style={{ borderColor: !darkMode ? styles.border : undefined }}
                >
                  <div 
                    className="w-1.5 rounded-full shrink-0" 
                    style={{ backgroundColor: styles.bg }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm transition-colors text-foreground">
                        {ev.mat}
                      </h4>
                      {ev.hora && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md flex items-center gap-1 bg-black/5 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <Clock className="w-3 h-3" />
                          {ev.hora}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground opacity-90">
                      {ev.desc}
                    </p>
                    {ev.aula && (
                      <div className="mt-2 text-xs flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3" />
                        Aula: {ev.aula}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={handleAddClick}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-border text-slate-500 hover:text-foreground hover:border-foreground/30 hover:bg-black/5 dark:hover:bg-slate-800 transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar nueva tarea
        </button>
      </div>
    </div>
  );
}
