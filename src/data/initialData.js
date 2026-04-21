export const initialData = {
  config: {
    fecha_inicio: "2026-04-20",
    materias: {
      MPN: { nombre: "Modelado de Procesos de Negocios", color: "violet-500" },
      SI: { nombre: "Sistemas de Información I", color: "blue-500" },
      PCP: { nombre: "Planificación y Control de Proyectos", color: "emerald-500" },
      ER: { nombre: "Especificación de Requerimientos", color: "amber-500" },
      SO: { nombre: "Sistemas Operativos", color: "red-500" }
    }
  },
  horarios_fijos: [
    { dia: "Lunes", eventos: [ { hora: "15:00 - 18:00", mat: "PCP", aula: "" }, { hora: "18:30 - 21:00", mat: "ER", aula: "" } ] },
    { dia: "Martes", eventos: [ { hora: "14:00 - 16:00", mat: "SI", aula: "" } ] },
    { dia: "Miércoles", eventos: [ { hora: "18:00 - 21:00", mat: "ER", aula: "" } ] },
    { dia: "Jueves", eventos: [ { hora: "16:00 - 18:00", mat: "SI", aula: "" }, { hora: "18:00 - 21:00", mat: "MPN", aula: "" } ] },
    { dia: "Viernes", eventos: [ { hora: "10:00 - 12:00", mat: "SO", aula: "" }, { hora: "14:00 - 16:00", mat: "SO", aula: "" } ] }
  ],
  hitos: [
    { fecha: "2026-04-20", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-21", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-22", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-23", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-24", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-27", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-28", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-29", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-30", mat: "MPN", desc: "TP3A" },
    
    { fecha: "2026-05-07", mat: "SI", desc: "PRIMER PARCIAL" },
    { fecha: "2026-05-11", mat: "ER", desc: "Entrega TP2" },
    { fecha: "2026-05-11", mat: "PCP", desc: "1ra Exp. Oral" },
    { fecha: "2026-05-16", mat: "SO", desc: "Recuperatorio Ej. 1" },
    { fecha: "2026-05-29", mat: "SO", desc: "SEGUNDO PARCIAL" }
  ],
  habitos: {
    "Deporte": false,
    "Limpieza del día": false
  }
};
