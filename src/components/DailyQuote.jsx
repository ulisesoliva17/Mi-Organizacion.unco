import { useMemo } from 'react';
import { getDayOfYear } from 'date-fns';
import { Quote } from 'lucide-react';

// ─── Quote pool ──────────────────────────────────────────────────────────────
// ~equal thirds: motivational | philosophical | Christian/Catholic reflection
const QUOTES = [
  // ── Motivacionales ──
  { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier" },
  { text: "No cuentes los días; haz que los días cuenten.", author: "Muhammad Ali" },
  { text: "La disciplina es el puente entre metas y logros.", author: "Jim Rohn" },
  { text: "Primero forma el hábito, luego el hábito te forma a ti.", author: "Jim Ryun" },
  { text: "Un día a la vez. Un paso a la vez.", author: "Proverbio popular" },
  { text: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs" },
  { text: "No esperes el momento perfecto; toma el momento y hazlo perfecto.", author: "Zoey Sayward" },
  { text: "Cada amanecer es una nueva oportunidad para cambiar tu historia.", author: "Anónimo" },
  { text: "La excelencia no es un acto, sino un hábito.", author: "Aristóteles" },
  { text: "Cae siete veces, levántate ocho.", author: "Proverbio japonés" },

  // ── Filosóficas / Reflexivas ──
  { text: "Conocerse a uno mismo es el comienzo de toda sabiduría.", author: "Aristóteles" },
  { text: "La mayor gloria de vivir no está en no caer, sino en levantarse cada vez que caemos.", author: "Nelson Mandela" },
  { text: "Somos lo que hacemos repetidamente.", author: "Aristóteles" },
  { text: "La vida no se mide por los momentos que respiramos, sino por los que nos quitan el aliento.", author: "Maya Angelou" },
  { text: "En medio de la dificultad reside la oportunidad.", author: "Albert Einstein" },
  { text: "Lo que no me mata, me hace más fuerte.", author: "Friedrich Nietzsche" },
  { text: "La educación es el arma más poderosa para cambiar el mundo.", author: "Nelson Mandela" },
  { text: "El tiempo es el recurso más valioso que tenemos; no lo desperdicies.", author: "Theophrastus" },
  { text: "La creatividad es inteligencia divirtiéndose.", author: "Albert Einstein" },
  { text: "Actúa como si lo que haces marcara la diferencia. Lo hace.", author: "William James" },

  // ── Reflexiones cristianas / católicas ──
  { text: "Todo lo puedo en Cristo que me fortalece.", author: "Filipenses 4:13" },
  { text: "La fe no hace las cosas fáciles; las hace posibles.", author: "Lucas 1:37" },
  { text: "Encomienda al Señor tus obras y tus proyectos se realizarán.", author: "Proverbios 16:3" },
  { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", author: "Isaías 41:10" },
  { text: "El que trabaja para el Señor nunca trabaja en vano.", author: "1 Corintios 15:58" },
  { text: "La sabiduría que viene de arriba es primeramente pura, luego pacífica.", author: "Santiago 3:17" },
  { text: "Ama al Señor tu Dios con todo tu corazón, toda tu mente y todas tus fuerzas.", author: "Marcos 12:30" },
  { text: "Ora como si todo dependiera de Dios; trabaja como si todo dependiera de ti.", author: "San Ignacio de Loyola" },
  { text: "Dios no llama a los capacitados, capacita a los llamados.", author: "San Pablo" },
  { text: "Haz el bien a todos, y no te canses de hacerlo.", author: "Gálatas 6:9" },

  // ── Extra variadas ──
  { text: "El aprendizaje nunca agota la mente; la alimenta.", author: "Leonardo da Vinci" },
  { text: "La paciencia es amarga, pero su fruto es dulce.", author: "Jean-Jacques Rousseau" },
  { text: "Quien tiene un porqué para vivir puede soportar casi cualquier cómo.", author: "Friedrich Nietzsche" },
  { text: "La gratitud convierte lo que tenemos en suficiente.", author: "Melody Beattie" },
  { text: "Haz hoy lo que otros no quieren hacer; vive mañana como otros no pueden.", author: "Jerry Rice" },
];

// ─── Pick today's quote deterministically by day-of-year ──────────────────
function getTodaysQuote() {
  const dayIndex = getDayOfYear(new Date()) - 1; // 0-based
  return QUOTES[dayIndex % QUOTES.length];
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function DailyQuote() {
  const quote = useMemo(() => getTodaysQuote(), []);

  return (
    <div className="flex items-start gap-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl min-w-0">
      <Quote
        className="w-4 h-4 shrink-0 mt-0.5 text-slate-400 dark:text-slate-500"
        strokeWidth={2}
      />
      <div className="min-w-0">
        <p className="text-[11px] sm:text-xs md:text-sm leading-snug font-medium italic text-slate-700 dark:text-white line-clamp-2 md:line-clamp-none">
          {quote.text}
        </p>
        <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 truncate">
          — {quote.author}
        </p>
      </div>
    </div>
  );
}
