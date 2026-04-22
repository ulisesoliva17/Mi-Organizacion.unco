import { useMemo } from 'react';
import { getEventsForDate, formatDateEs, getMateriaHex } from '../utils/dateUtils';
import { addDays, startOfDay } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function FocusToday({ data, onEventClick }) {
  const todayDate = startOfDay(new Date());
  // The user requirement says: "filtrar y mostrar solo eventos con fecha igual o posterior al 20/04/2026."
  const minDate = new Date(`${data.config.fecha_inicio}T00:00:00`);
  const effectiveToday = todayDate < minDate ? minDate : todayDate;
  const tomorrowDate = addDays(effectiveToday, 1);

  const todayEvents = useMemo(() => getEventsForDate(effectiveToday, data), [effectiveToday, data]);
  const tomorrowEvents = useMemo(() => getEventsForDate(tomorrowDate, data), [tomorrowDate, data]);

  const renderEventList = (events) => {
    if (events.length === 0) {
      return <p className="text-sm text-slate-500 italic">No hay tareas o cursadas programadas.</p>;
    }
    
    return (
      <div className="space-y-3">
        {events.map((ev, i) => {
          return (
            <div 
              key={i} 
              onClick={() => onEventClick(ev)}
              className="group flex gap-4 p-3 rounded-xl border border-border bg-card dark:bg-slate-900 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div 
                className="w-1.5 rounded-full shrink-0" 
                style={{ backgroundColor: getMateriaHex(ev.mat, data) }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-black dark:text-white transition-colors">
                    {ev.mat}
                  </h4>
                  {ev.hora && (
                    <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ev.hora}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 dark:text-white font-medium">
                  {ev.desc}
                </p>
                {ev.aula && (
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Aula: {ev.aula}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="glass-card p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
        <div className="p-3 bg-foreground text-background rounded-full shadow-md">
          <Calendar className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight uppercase">Foco Hoy</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-200 uppercase tracking-wider mb-3">
            Hoy - {formatDateEs(effectiveToday)}
          </h3>
          {renderEventList(todayEvents)}
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-200 uppercase tracking-wider mb-3">
            Mañana - {formatDateEs(tomorrowDate)}
          </h3>
          {renderEventList(tomorrowEvents)}
        </div>
      </div>
    </div>
  );
}
