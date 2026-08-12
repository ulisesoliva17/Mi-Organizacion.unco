export const initialData = {
  dataVersion: 3,
  config: {
    fecha_inicio: "2026-04-20",
    materias: {
      ING: { nombre: "Inglés autodidacta", color: "teal-500", profesor: "Autodidacta" },
      BE: { nombre: "Bloque de estudio", color: "yellow-500" },
      RED1: { nombre: "Redes de Computadoras I", color: "cyan-600", profesor: "Zanellato" },
      LBD: { nombre: "Laboratorio de Bases de Datos", color: "fuchsia-600", profesor: "Mazalu" },
      SI2: { nombre: "Sistemas de Información II", color: "indigo-600", profesor: "Martinez" },
      DMD: { nombre: "Depósito y Minería de Datos", color: "rose-600", profesor: "Buccella" },
      IA: { nombre: "Inteligencia Artificial", color: "lime-600", profesor: "Cecchi - Marinelli" },
      EDS: { nombre: "Especificación de Diseño de Software", color: "orange-600", profesor: "De Renzis" }
    }
  },
  horarios_fijos: [
    { dia: "Lunes", eventos: [
      { hora: "10:00 - 12:00", mat: "ING", desc: "Inglés autodidacta" },
      { hora: "16:30 - 20:30", mat: "LBD", desc: "Teoría-Práctica", aula: "Aula i6" }
    ] },
    { dia: "Martes", eventos: [
      { hora: "10:00 - 11:00", mat: "BE", desc: "Bloque de estudio" },
      { hora: "13:00 - 15:00", mat: "RED1", desc: "Redes de Computadoras I", aula: "Aula i6" },
      { hora: "17:00 - 19:00", mat: "SI2", desc: "Teoría/Práctica", aula: "Virtual" }
    ] },
    { dia: "Miércoles", eventos: [
      { hora: "10:00 - 12:00", mat: "ING", desc: "Inglés autodidacta" },
      { hora: "15:00 - 21:00", mat: "DMD", desc: "Teoría/Práctica", aula: "Aula i6" }
    ] },
    { dia: "Jueves", eventos: [
      { hora: "10:00 - 12:00", mat: "BE", desc: "Bloque de estudio" },
      { hora: "15:00 - 17:00", mat: "IA", desc: "Teoría", aula: "Aula i8" },
      { hora: "17:00 - 19:00", mat: "IA", desc: "Práctica", aula: "Aula i8" }
    ] },
    { dia: "Viernes", eventos: [
      { hora: "10:00 - 11:00", mat: "BE", desc: "Bloque de estudio" },
      { hora: "13:00 - 15:00", mat: "RED1", desc: "Redes de Computadoras I", aula: "Aula i6" },
      { hora: "17:00 - 19:00", mat: "EDS", desc: "Teoría", aula: "Aula i9" },
      { hora: "19:00 - 21:00", mat: "EDS", desc: "Práctica", aula: "Aula i9" }
    ] }
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
    { fecha: "2026-05-18", mat: "MPN", desc: "Leer y analizar Unidad III BPMN (págs. 55-120) | Trabajar en TP3B. Clase el martes esta semana" },
    { fecha: "2026-05-19", mat: "MPN", desc: "TP3B (Clase Martes)" },
    { fecha: "2026-05-26", mat: "MPN", desc: "Leer Unidad IV (págs. 1-55) | Trabajar en TP3B y TP4" },

    { fecha: "2026-06-01", mat: "MPN", desc: "Leer Unidad V (págs. 1-36) | Trabajar en TP4 y TP5" },
    { fecha: "2026-06-05", mat: "MPN", desc: "ENTREGA: TP5 - Ejercicio 1" },
    { fecha: "2026-06-08", mat: "MPN", desc: "SEGUNDO PARCIAL" },
    { fecha: "2026-06-16", mat: "MPN", desc: "Consultas virtuales" },
    { fecha: "2026-06-22", mat: "MPN", desc: "Recuperatorio 2do Parcial" },
    { fecha: "2026-06-29", mat: "MPN", desc: "COLOQUIO" },

    { fecha: "2026-05-05", mat: "SI", desc: "Consulta Unidad II" },
    { fecha: "2026-05-07", mat: "SI", desc: "PRIMER PARCIAL" },
    { fecha: "2026-05-12", mat: "SI", desc: "TP 3 - Ej. 2" },
    { fecha: "2026-05-14", mat: "SI", desc: "VF Ej. 3 TP 3" },
    { fecha: "2026-05-19", mat: "SI", desc: "Presentar PDF grupal: TP 3 - Ej. 4 y 8" },
    { fecha: "2026-05-21", mat: "SI", desc: "Responder en planilla compartida: VF Ej. 6 TP 3" },
    { fecha: "2026-05-26", mat: "SI", desc: "Presentar PDF grupal: TP 4 - Ej. 2" },
    { fecha: "2026-05-28", mat: "SI", desc: "Responder en planilla compartida: TP 4 - Ej. 8" },

    { fecha: "2026-06-02", mat: "SI", desc: "Presentar PDF grupal: TP 4 - Ej. 9" },
    { fecha: "2026-06-04", mat: "SI", desc: "Responder en planilla compartida: VF Ej. 10 TP 4" },
    { fecha: "2026-06-09", mat: "SI", desc: "Presentar PDF grupal: Consultas Unidades III y IV | Cierre Unidad IV" },
    { fecha: "2026-06-11", mat: "SI", desc: "Responder en planilla compartida: TP 5 - Ej. 3" },
    { fecha: "2026-06-16", mat: "SI", desc: "Presentar PDF grupal: TP 5 - Ej. 6 y 7 | Cierre Unidad V" },
    { fecha: "2026-06-18", mat: "SI", desc: "Consultas Unidad V" },
    { fecha: "2026-06-23", mat: "SI", desc: "SEGUNDO PARCIAL" },

    { fecha: "2026-07-02", mat: "SI", desc: "RECUPERATORIO INTEGRAL" },

    { fecha: "2026-05-11", mat: "ER", desc: "Entrega TP2" },
    { fecha: "2026-05-11", mat: "PCP", desc: "1ra Exp. Oral" },
    { fecha: "2026-05-16", mat: "SO", desc: "Recuperatorio Ej. 1" },
    { fecha: "2026-05-18", mat: "PCP", desc: "Práctica: Teoría de CPM" },
    { fecha: "2026-05-25", mat: "PCP", desc: "FERIADO - Revolución de Mayo" },
    { fecha: "2026-05-29", mat: "SO", desc: "SEGUNDO PARCIAL" },
    { fecha: "2026-06-01", mat: "PCP", desc: "Planificación 1ra a 3ra Partes | Práctica TP COCOMO 81 y CPM" },
    { fecha: "2026-06-08", mat: "PCP", desc: "COCOMO II | Práctica Cierre Consulta COCOMO 81 y CPM" },
    { fecha: "2026-06-15", mat: "PCP", desc: "FERIADO - Güemes" },
    { fecha: "2026-06-16", mat: "PCP", desc: "2do TPO: COCOMO-81 y CPM (Trabajo Domiciliario, entrega hasta 19/06)" },
    { fecha: "2026-06-22", mat: "PCP", desc: "Consulta Exposición" },
    { fecha: "2026-06-29", mat: "PCP", desc: "2da Exposición Oral de Teoría - Planificación de Proyectos" }
  ],
  habitos: {
    "Deporte": false,
    "Limpieza del día": false
  }
};
