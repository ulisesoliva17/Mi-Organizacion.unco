import { format, parseISO, addDays, getDay, isSameDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

const DAYS_OF_WEEK = {
  "Domingo": 0,
  "Lunes": 1,
  "Martes": 2,
  "Miércoles": 3,
  "Jueves": 4,
  "Viernes": 5,
  "Sábado": 6
};

// Return a list of all events for a given day (both fixed and specific hits)
export function getEventsForDate(date, data) {
  const dayOfWeekIndex = getDay(date);
  const dateStr = format(date, 'yyyy-MM-dd');
  
  // 1. Get fixed events for this day of week
  const fixedDayEntry = data.horarios_fijos.find(
    entry => DAYS_OF_WEEK[entry.dia] === dayOfWeekIndex
  );
  const fixedEvents = fixedDayEntry ? fixedDayEntry.eventos.map(ev => ({
    ...ev,
    isFixed: true,
    desc: `Cursada en ${ev.aula}`,
    fecha: dateStr
  })) : [];

  // 2. Get hitos for this date
  const hitos = data.hitos.filter(hito => hito.fecha === dateStr).map(hito => ({
    ...hito,
    isFixed: false,
    hora: 'Todo el día' // hitos don't have time specified initially
  }));

  return [...fixedEvents, ...hitos];
}

export function getColorsForMateria(materia, data) {
  const colorStr = data.config.materias[materia]?.color || "slate-500";
  // Tailwind v4 uses variable like bg-violet-500. We can just return the tailwind class strings
  return {
    bg: `bg-${colorStr}`,
    text: `text-${colorStr}`,
    border: `border-${colorStr}`
  };
}

export function getCalendarDays(startDate, numDays = 30) {
  const days = [];
  const start = startOfDay(startDate);
  for (let i = 0; i < numDays; i++) {
    days.push(addDays(start, i));
  }
  return days;
}

export function formatDateEs(date) {
  return format(date, "EEEE d 'de' MMMM", { locale: es });
}

export function formatShortDateEs(date) {
  return format(date, "d MMM", { locale: es });
}
