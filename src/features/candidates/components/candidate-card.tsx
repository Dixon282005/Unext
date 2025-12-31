"use client";

import { MapPin, Calendar, User, Briefcase, CheckCircle2, Clock, XCircle } from "lucide-react";

interface CandidateCardProps {
  candidate: any; // Usamos any por ahora para facilitar la integración con tu mock
  isDark: boolean;
  onClick?: () => void;
}

export function CandidateCard({ candidate, isDark, onClick }: CandidateCardProps) {
  
  // Helper para el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "interview": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "hired": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendiente";
      case "interview": return "Entrevista";
      case "rejected": return "Rechazado";
      case "hired": return "Contratado";
      default: return status;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group relative overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-lg ${
        isDark
          ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
          : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
      }`}
    >
      {/* Barra superior decorativa */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      <div className="p-4 md:p-6">
        {/* Header: Avatar y Nombre */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {candidate.avatar_url ? (
                <img src={candidate.avatar_url} alt={candidate.full_name} className="w-full h-full rounded-full object-cover" />
              ) : (
                candidate.full_name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <h3 className={`font-semibold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                {candidate.full_name}
              </h3>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} flex items-center gap-1`}>
                <Briefcase className="w-3 h-3" />
                {candidate.job_title_applied}
              </p>
            </div>
          </div>
          
          {/* Badge de Match */}
          <div className={`px-2 py-1 rounded-md text-xs font-bold border ${
            candidate.match_percentage >= 90
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50"
              : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/50"
          }`}>
            {candidate.match_percentage}%
          </div>
        </div>

        {/* Info: Ubicación y Bio */}
        <div className="space-y-3 mb-4">
          <div className={`text-xs flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            <MapPin className="w-3.5 h-3.5" />
            <span>{candidate.city_text}, {candidate.country}</span>
          </div>
          
          <p className={`text-sm line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {candidate.bio}
          </p>
        </div>

        {/* Footer: Fecha y Estado */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className={`text-xs flex items-center gap-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            <Calendar className="w-3 h-3" />
            Aplicó: {candidate.applied_at}
          </div>
          
          <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(candidate.status)}`}>
            {getStatusLabel(candidate.status)}
          </div>
        </div>
      </div>
    </div>
  );
}