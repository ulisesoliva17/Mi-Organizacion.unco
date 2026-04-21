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

// Static hex color map — avoids Tailwind purging dynamic class names
const COLOR_HEX_MAP = {
  "violet-600": "#7c3aed",
  "violet-500": "#8b5cf6",
  "blue-600":   "#2563eb",
  "blue-500":   "#3b82f6",
  "emerald-600":"#059669",
  "emerald-500":"#10b981",
  "amber-500":  "#f59e0b",
  "amber-600":  "#d97706",
  "red-600":    "#dc2626",
  "red-500":    "#ef4444",
  "slate-500":  "#64748b",
  "sky-400":    "#38bdf8",
  "orange-500": "#f97316",
};

export const HABIT_CATEGORIES = {
  limpieza: { name: 'Limpieza', color: 'sky-400', hex: '#38bdf8' },
  deporte: { name: 'Deporte', color: 'orange-500', hex: '#f97316' },
};

export function getMateriaHex(materia, data) {
  const colorStr = data.config.materias[materia]?.color || "slate-500";
  return COLOR_HEX_MAP[colorStr] || "#64748b";
}

export function getCategoryHex(catKey, data) {
  if (HABIT_CATEGORIES[catKey]) return HABIT_CATEGORIES[catKey].hex;
  
  // Check if it's a subject key (MPN, SI, etc)
  if (data?.config?.materias?.[catKey]) {
    const colorKey = data.config.materias[catKey].color;
    return COLOR_HEX_MAP[colorKey] || "#64748b";
  }

  // Fallback to direct color map or slate
  return COLOR_HEX_MAP[catKey] || "#64748b";
}

export function getDynamicSubjectStyles(materia, data, isDarkMode) {
  // Resolve hex: prefer materia lookup, fall back to category lookup
  // (handles Limpieza, Deporte, and any custom category key)
  let baseHex = getMateriaHex(materia, data);
  // getMateriaHex returns slate fallback (#64748b) for unknown keys;
  // try getCategoryHex which also checks HABIT_CATEGORIES
  if (baseHex === '#64748b') {
    const catHex = getCategoryHex(materia, data);
    if (catHex !== '#64748b') baseHex = catHex;
  }

  if (isDarkMode) {
    return {
      bg: baseHex,
      text: '#ffffff', // White text on coloured background
    };
  } else {
    return {
      bg: `${baseHex}22`, // ~13% opacity tint
      text: '#0f172a',    // Dark slate text for contrast
      border: baseHex,
    };
  }
}

export function getColorsForMateria(materia, data) {
  const hex = getMateriaHex(materia, data);
  return { hex };
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
