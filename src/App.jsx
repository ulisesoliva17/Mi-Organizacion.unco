import { useState } from 'react';
import { useAppStore } from './hooks/useAppStore';
import FocusToday from './components/FocusToday';
import MonthlyCalendar from './components/MonthlyCalendar';
import HabitsTracker from './components/HabitsTracker';
import TaskEditModal from './components/TaskEditModal';
import { Moon, Sun, BookOpen } from 'lucide-react';

function App() {
  const { data, darkMode, toggleDarkMode, toggleHabit, addHabit, addGeneratedTask, removeHabit, updateHito, deleteHito, addManualTask } = useAppStore();
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEventClick = (event) => {
    setEditingEvent(event);
  };

  const handleSaveEvent = (oldEvent, newFormData) => {
    if (!oldEvent.isFixed) {
      updateHito(oldEvent, newFormData);
    } else {
      updateHito(
        { fecha: newFormData.fecha, mat: newFormData.mat, desc: "Nuevo" }, 
        newFormData
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-2 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-4 md:space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center glass-card px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-foreground text-background rounded-xl shadow-sm">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold tracking-tight leading-none">UNCo Tracker</h1>
              <p className="text-[10px] md:text-sm text-slate-500 font-medium">Ingeniería de Software</p>
            </div>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 md:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </header>

        {/* Layout Grid - Stacks on mobile, Grid on large screens */}
        <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-12">
          
          {/* 1. FOCO HOY - First on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-8 xl:col-span-9 flex flex-col h-full">
            <FocusToday data={data} darkMode={darkMode} onEventClick={handleEventClick} />
          </div>

          {/* 2. HÁBITOS - Second on mobile, Sidebar on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-4 xl:col-span-3 flex flex-col">
            <HabitsTracker
              data={data}
              darkMode={darkMode}
              onToggleHabit={toggleHabit}
              onAddHabit={addHabit}
              onAddGeneratedTask={addGeneratedTask}
              onRemoveHabit={removeHabit}
            />
          </div>

          {/* 3. CALENDARIO - Bottom */}
          <div className="order-3 lg:col-span-12 w-full">
            <MonthlyCalendar data={data} darkMode={darkMode} onEventClick={handleEventClick} onAddTask={addManualTask} />
          </div>

        </div>

      </div>

      <TaskEditModal 
        isOpen={!!editingEvent} 
        event={editingEvent} 
        onClose={() => setEditingEvent(null)}
        onSave={handleSaveEvent}
        onDelete={deleteHito}
      />
    </div>
  );
}

export default App;
