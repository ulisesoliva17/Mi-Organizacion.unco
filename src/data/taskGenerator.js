// Pool of creative 10-minute tasks organized by category
const TASK_POOL = [
  // 🖥️ Periféricos Mac
  { emoji: '🖥️', text: 'Limpiar el teclado de la Mac con un hisopo y alcohol isopropílico' },
  { emoji: '🖥️', text: 'Pasar un paño de microfibra por la pantalla y el trackpad' },
  { emoji: '🖥️', text: 'Desconectar y limpiar el mouse, audífonos y cargadores' },
  { emoji: '🖥️', text: 'Revisar y eliminar archivos de Descargas mayores a 1 GB' },
  { emoji: '🖥️', text: 'Vaciar la papelera y borrar apps que no usás' },

  // 🔌 Cables y escritorio
  { emoji: '🔌', text: 'Organizar los cables del escritorio con bridas o clips' },
  { emoji: '🔌', text: 'Enrollar y etiquetar los cables sueltos del área de estudio' },
  { emoji: '🔌', text: 'Desempolvar el escritorio y la base del monitor' },
  { emoji: '🔌', text: 'Ordenar enchufes y regletas: desconectar lo que no se usa' },

  // 📐 Materiales de ingeniería
  { emoji: '📐', text: 'Ordenar las carpetas y apuntes de las materias en sus biblioratos' },
  { emoji: '📐', text: 'Revisar si hay lapiceras secas y reemplazarlas' },
  { emoji: '📐', text: 'Escanear o fotografiar apuntes sueltos y guardarlos en Drive' },
  { emoji: '📐', text: 'Armar una pila de "cosas para archivar" en el escritorio' },
  { emoji: '📐', text: 'Etiquetar y guardar las hojas de exámenes viejos' },
  { emoji: '📐', text: 'Acomodar las reglas, escuadras y calculadora en su lugar' },

  // 🍳 Cocina rápida
  { emoji: '🍳', text: 'Lavar los vasos y tazas que quedaron pendientes' },
  { emoji: '🍳', text: 'Limpiar el microondas por dentro con agua y limón' },
  { emoji: '🍳', text: 'Revisar el fondo de la heladera y tirar lo vencido' },
  { emoji: '🍳', text: 'Pasar un trapo húmedo por la mesada y la hornalla' },
  { emoji: '🍳', text: 'Sacar la basura y poner una bolsa nueva' },
  { emoji: '🍳', text: 'Ordenar la alacena: agrupar latas, fideos, cereales' },

  // 🐱 Mascotas (gatas)
  { emoji: '🐱', text: 'Lavar y secar los recipientes de comida y agua de las gatas' },
  { emoji: '🐱', text: 'Limpiar la bandeja sanitaria y cambiar el arena' },
  { emoji: '🐱', text: 'Cepillar el pelo de las gatas por 10 minutos' },
  { emoji: '🐱', text: 'Revisar y acomodar los juguetes de las gatas' },
  { emoji: '🐱', text: 'Limpiar el lugar donde duermen las gatas' },

  // 🧹 Limpieza rápida del hogar
  { emoji: '🧹', text: 'Barrer el piso de la habitación' },
  { emoji: '🧹', text: 'Pasar una bayeta húmeda por los bordes de la puerta y ventanas' },
  { emoji: '🧹', text: 'Doblar y guardar la ropa limpia que está en la silla' },
  { emoji: '🧹', text: 'Hacer la cama y acomodar las almohadas' },
  { emoji: '🧹', text: 'Pasar un trapo por los estantes y libros de la habitación' },
  { emoji: '🧹', text: 'Acomodar el placard: un cajón por vez' },
];

export function getRandomTask() {
  const idx = Math.floor(Math.random() * TASK_POOL.length);
  const task = TASK_POOL[idx];
  return `⏱️ ${task.emoji} ${task.text}`;
}

export { TASK_POOL };
