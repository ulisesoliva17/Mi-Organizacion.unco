import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TaskEditModal({ isOpen, onClose, event, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    fecha: '',
    mat: '',
    desc: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        fecha: event.fecha || '',
        mat: event.mat || '',
        desc: event.desc || ''
      });
    }
  }, [event]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(event, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 tracking-tight">Editar Tarea</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Materia</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
              value={formData.mat}
              onChange={(e) => setFormData({...formData, mat: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea 
              className="w-full px-3 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
              value={formData.desc}
              onChange={(e) => setFormData({...formData, desc: e.target.value})}
              rows="3"
              required
            />
          </div>
          <div className="flex justify-between pt-4">
            {!event.isFixed && (
              <button 
                type="button" 
                onClick={() => { onDelete(event); onClose(); }}
                className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              >
                Eliminar
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
