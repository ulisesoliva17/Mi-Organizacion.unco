import { useState } from 'react';
import { useAppStore } from './hooks/useAppStore';
import FocusToday from './components/FocusToday';
import MonthlyCalendar from './components/MonthlyCalendar';
import HabitsTracker from './components/HabitsTracker';
import TaskEditModal from './components/TaskEditModal';
import { Moon, Sun, BookOpen } from 'lucide-react';

function App() {
  const { data, darkMode, toggleDarkMode, toggleHabit, updateHito, deleteHito } = useAppStore();
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEventClick = (event) => {
    setEditingEvent(event);
  };

  const handleSaveEvent = (oldEvent, newFormData) => {
    // Both hitos and fixed events updates can be converted/saved as hitos in this setup
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center glass-card px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-foreground text-background rounded-xl shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">UNCo Tracker</h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium">Ingeniería de Software</p>
            </div>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top Row: Left Sidebar (Habits) + Center/Right Area (Focus Today) */}
          <div className="lg:col-span-12 flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Angosta (Left Column) */}
            <div className="w-full lg:w-1/4 xl:w-1/5 shrink-0 flex flex-col gap-6">
              <HabitsTracker data={data} onToggleHabit={toggleHabit} />
            </div>

            {/* Foco Hoy Vertical (Center/Right Column) */}
            <div className="w-full lg:w-3/4 xl:w-4/5 flex-1">
              <FocusToday data={data} onEventClick={handleEventClick} />
            </div>
          </div>

          {/* Bottom Row: Full Width Calendar */}
          <div className="lg:col-span-12 w-full">
            <MonthlyCalendar data={data} onEventClick={handleEventClick} />
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
