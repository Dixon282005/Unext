"use client";

import { X } from "lucide-react";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  editingJobId: string | number | null;
}

export function JobModal({ isOpen, onClose, isDark, editingJobId }: JobModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
            {editingJobId ? "Editar Vacante" : "Publicar Nueva Vacante"}
          </h2>
          <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className={`block text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Título del puesto *</label>
            <input type="text" placeholder="Ej: Senior Frontend Developer" className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"} focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Departamento *</label>
              <select className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}>
                <option>Tecnología</option>
                <option>Diseño</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Tipo de empleo *</label>
              <select className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}>
                <option>Tiempo completo</option>
                <option>Medio tiempo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Ubicación *</label>
              <input type="text" placeholder="Ej: CDMX, Remoto" className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border-none focus:ring-2 focus:ring-purple-500`} />
            </div>
            <div>
              <label className={`block text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Salario *</label>
              <input type="text" placeholder="$2000 - $3000" className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border-none focus:ring-2 focus:ring-purple-500`} />
            </div>
          </div>

          <div>
             <label className={`block text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Descripción *</label>
             <textarea rows={4} className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border-none focus:ring-2 focus:ring-purple-500`}></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              {editingJobId ? "Guardar Cambios" : "Publicar"}
            </button>
            <button onClick={onClose} className={`flex-1 px-6 py-3 rounded-lg transition-colors ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-600 hover:text-gray-900"}`}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}