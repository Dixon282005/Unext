"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { CandidateCard } from "@/features/candidates/components/candidate-card";
// Importamos la data que nos mostraste
import { candidates } from "@/features/dashboard/lib/mockdata";

interface CandidatesViewProps {
  isDark: boolean;
}

export function CandidatesView({ isDark }: CandidatesViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtramos por nombre
  // Filtramos por nombre
  const filteredCandidates = candidates.filter(c => 
    // Usamos (c.full_name ?? "") para que si es null, lo trate como texto vacío
    (c.full_name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* HEADER: BUSCADOR Y FILTRO */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
          <input
            type="text"
            placeholder="Buscar candidatos por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
            } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
          />
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            isDark
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filtrar</span>
        </button>
      </div>

      {/* GRID DE CANDIDATOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isDark={isDark}
            onClick={() => console.log("Ver candidato:", candidate.id)}
          />
        ))}
        
        {filteredCandidates.length === 0 && (
            <div className={`col-span-full text-center py-10 rounded-xl border border-dashed ${isDark ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-400"}`}>
                No se encontraron candidatos.
            </div>
        )}
      </div>
    </div>
  );
}