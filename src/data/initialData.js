export const initialData = {
  config: {
    fecha_inicio: "2026-04-20",
    materias: {
      MPN: { nombre: "Modelado de Procesos de Negocios", color: "violet-600" },
      SI: { nombre: "Sistemas de Información I", color: "blue-600" },
      PCP: { nombre: "Planificación y Control de Proyectos", color: "emerald-600" },
      ER: { nombre: "Especificación de Requerimientos", color: "amber-500" },
      SO: { nombre: "Sistemas Operativos", color: "red-600" }
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
    { fecha: "2026-04-15", mat: "SI", desc: "TP 2 - Ej. 3" },
    { fecha: "2026-04-16", mat: "SI", desc: "VF Ej. 2 TP 2" },
    { fecha: "2026-04-21", mat: "SI", desc: "TP 2 - Ej. 5" },
    { fecha: "2026-04-23", mat: "SI", desc: "VF Ej. 4 TP 2" },
    { fecha: "2026-04-28", mat: "SI", desc: "TP 2 - Ej. 8 y Cierre Unidad II" },
    
    { fecha: "2026-04-20", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-21", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-22", mat: "MPN", desc: "Entrega TP3A Ejercicio 1" },
    { fecha: "2026-04-23", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-24", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-27", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-28", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-29", mat: "MPN", desc: "TP3A" },
    { fecha: "2026-04-30", mat: "MPN", desc: "TP3A" },
    
    { fecha: "2026-05-04", mat: "MPN", desc: "Primer Parcial (Semana)" },
    { fecha: "2026-05-04", mat: "MPN", desc: "Consultas 1er Parcial (Semana)" },
    { fecha: "2026-05-11", mat: "MPN", desc: "TP3B (Semana)" },
    { fecha: "2026-05-18", mat: "MPN", desc: "Recuperatorio 1 Parcial (Semana)" },
    { fecha: "2026-05-19", mat: "MPN", desc: "TP3B (Clase Martes)" },
    { fecha: "2026-05-26", mat: "MPN", desc: "TP3B y TP4 (Semana)" },
    
    { fecha: "2026-06-01", mat: "MPN", desc: "TP4 y TP5 (Semana)" },
    { fecha: "2026-06-05", mat: "MPN", desc: "Entrega TP5 Ejercicio 1" },
    { fecha: "2026-06-08", mat: "MPN", desc: "Segundo Parcial (Semana)" },
    { fecha: "2026-06-16", mat: "MPN", desc: "Consultas virtuales (Semana)" },
    { fecha: "2026-06-22", mat: "MPN", desc: "Recuperatorio 2do Parcial (Semana)" },
    { fecha: "2026-06-29", mat: "MPN", desc: "COLOQUIO (Semana)" },
    
    { fecha: "2026-05-05", mat: "SI", desc: "Consulta Unidad II" },
    { fecha: "2026-05-07", mat: "SI", desc: "PRIMER PARCIAL" },
    { fecha: "2026-05-12", mat: "SI", desc: "TP 3 - Ej. 2" },
    { fecha: "2026-05-14", mat: "SI", desc: "VF Ej. 3 TP 3" },
    { fecha: "2026-05-19", mat: "SI", desc: "TP 3 - Ej. 4 y 8 y Cierre Unidad III" },
    { fecha: "2026-05-21", mat: "SI", desc: "VF Ej. 6 TP 3" },
    { fecha: "2026-05-26", mat: "SI", desc: "TP 4 - Ej. 2" },
    { fecha: "2026-05-28", mat: "SI", desc: "TP 4 - Ej. 8" },
    
    { fecha: "2026-06-02", mat: "SI", desc: "TP 4 - Ej. 9" },
    { fecha: "2026-06-04", mat: "SI", desc: "VF Ej 10 TP 4" },
    { fecha: "2026-06-09", mat: "SI", desc: "Consultas Unidades III y IV y Cierre Unidad IV" },
    { fecha: "2026-06-11", mat: "SI", desc: "TP 5 - Ej. 3" },
    { fecha: "2026-06-16", mat: "SI", desc: "TP 5 - Ej. 6 y 7" },
    { fecha: "2026-06-18", mat: "SI", desc: "Consultas Unidad V y Cierre Unidad V" },
    { fecha: "2026-06-23", mat: "SI", desc: "SEGUNDO PARCIAL" },
    
    { fecha: "2026-07-02", mat: "SI", desc: "RECUPERATORIO INTEGRAL" },

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
