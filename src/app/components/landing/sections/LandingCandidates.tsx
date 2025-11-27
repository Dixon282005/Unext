"use client";

import { useState } from 'react';
import { Search, MapPin, GraduationCap, Mail, Star, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface CandidatesProps {
  isDark: boolean;
}

export function LandingCandidates({ isDark }: CandidatesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const candidates = [
    {
      id: 1,
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      career: 'Ingeniería en Sistemas',
      university: 'Universidad Nacional',
      status: 'Estudiante',
      semester: '8vo semestre',
      location: 'Buenos Aires, Argentina',
      skills: ['React', 'TypeScript', 'Node.js', 'SQL'],
      rating: 4.9,
      projects: 12,
      bio: 'Apasionada por el desarrollo web y la creación de experiencias digitales innovadoras.',
      verified: true
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      career: 'Administración de Empresas',
      university: 'Universidad Tecnológica',
      status: 'Egresado',
      semester: 'Graduado 2024',
      location: 'Santiago, Chile',
      skills: ['Gestión', 'Excel', 'Power BI', 'Liderazgo'],
      rating: 5.0,
      projects: 8,
      bio: 'Egresado enfocado en gestión estratégica y análisis de negocios.',
      verified: true
    },
    {
      id: 3,
      name: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      career: 'Diseño Gráfico',
      university: 'Instituto de Diseño',
      status: 'Pasante',
      semester: 'Pasantía activa',
      location: 'Ciudad de México, México',
      skills: ['Figma', 'Adobe Suite', 'UI/UX', 'Ilustración'],
      rating: 4.8,
      projects: 15,
      bio: 'Diseñadora creativa con experiencia en branding y diseño digital.',
      verified: true
    },
    {
      id: 4,
      name: 'Luis Fernández',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      career: 'Marketing Digital',
      university: 'Universidad de Comunicaciones',
      status: 'Estudiante',
      semester: '6to semestre',
      location: 'Bogotá, Colombia',
      skills: ['SEO', 'Analytics', 'Social Media', 'Content'],
      rating: 4.7,
      projects: 10,
      bio: 'Estudiante con pasión por el marketing digital y estrategias de contenido.',
      verified: false
    },
    {
      id: 5,
      name: 'Sofia Torres',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
      career: 'Psicología Organizacional',
      university: 'Universidad del Desarrollo',
      status: 'Egresado',
      semester: 'Graduada 2023',
      location: 'Lima, Perú',
      skills: ['RRHH', 'Coaching', 'Evaluación', 'Capacitación'],
      rating: 4.9,
      projects: 7,
      bio: 'Profesional en RRHH enfocada en desarrollo de talento.',
      verified: true
    },
    {
      id: 6,
      name: 'Diego Vargas',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      career: 'Ingeniería Industrial',
      university: 'Universidad Tecnológica del Sur',
      status: 'Pasante',
      semester: 'Práctica profesional',
      location: 'Montevideo, Uruguay',
      skills: ['Lean', 'Procesos', 'AutoCAD', 'Six Sigma'],
      rating: 4.8,
      projects: 9,
      bio: 'Ingeniero en formación con enfoque en mejora continua.',
      verified: true
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.career.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCareer = selectedCareer === 'all' || candidate.career === selectedCareer;
    const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
    return matchesSearch && matchesCareer && matchesStatus;
  });

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]">
          <h1 className={`text-5xl mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Encuentra el{' '}
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              talento perfecto
            </span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredCandidates.length} profesionales verificados esperando tu propuesta
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className={`backdrop-blur-xl p-6 rounded-3xl mb-8 transition-all duration-500 opacity-0 animate-[fadeIn_0.8s_ease-in-out_0.2s_forwards] ${
          isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white border border-gray-200 shadow-lg'
        }`}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Buscar por nombre o carrera..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10' 
                    : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:border-gray-400 focus:bg-white'
                }`}
              />
            </div>
            
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className={`px-4 py-3 rounded-2xl transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white focus:border-white/30' 
                  : 'bg-gray-50 border border-gray-200 text-black focus:border-gray-400'
              }`}
            >
              <option value="all" className={isDark ? 'bg-black' : 'bg-white'}>Todas las carreras</option>
              <option value="Ingeniería en Sistemas" className={isDark ? 'bg-black' : 'bg-white'}>Ingeniería en Sistemas</option>
              <option value="Administración de Empresas" className={isDark ? 'bg-black' : 'bg-white'}>Administración de Empresas</option>
              <option value="Diseño Gráfico" className={isDark ? 'bg-black' : 'bg-white'}>Diseño Gráfico</option>
              <option value="Marketing Digital" className={isDark ? 'bg-black' : 'bg-white'}>Marketing Digital</option>
              <option value="Psicología Organizacional" className={isDark ? 'bg-black' : 'bg-white'}>Psicología Organizacional</option>
              <option value="Ingeniería Industrial" className={isDark ? 'bg-black' : 'bg-white'}>Ingeniería Industrial</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-4 py-3 rounded-2xl transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white focus:border-white/30' 
                  : 'bg-gray-50 border border-gray-200 text-black focus:border-gray-400'
              }`}
            >
              <option value="all" className={isDark ? 'bg-black' : 'bg-white'}>Todos los estados</option>
              <option value="Estudiante" className={isDark ? 'bg-black' : 'bg-white'}>Estudiante</option>
              <option value="Egresado" className={isDark ? 'bg-black' : 'bg-white'}>Egresado</option>
              <option value="Pasante" className={isDark ? 'bg-black' : 'bg-white'}>Pasante</option>
            </select>
          </div>
        </div>
        
        {/* Candidates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, index) => (
            <div 
              key={candidate.id} 
              className={`group relative backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards] ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                  : 'bg-white border border-gray-200 hover:border-purple-600/30 hover:shadow-xl'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Header */}
              <div className={`h-32 relative ${
                isDark ? 'bg-gradient-to-r from-purple-900 to-violet-900' : 'bg-gradient-to-r from-purple-700 to-purple-800'
              }`}>
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-b from-transparent to-[#0A0A0A]/50' 
                    : 'bg-gradient-to-b from-transparent to-white/50'
                }`}></div>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex flex-col items-center -mt-16 mb-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={candidate.avatar}
                      alt={candidate.name}
                      className={`w-28 h-28 rounded-3xl object-cover ${
                        isDark ? 'border-4 border-[#0A0A0A]' : 'border-4 border-white'
                      }`}
                    />
                    {candidate.verified && (
                      <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center ${
                        isDark 
                          ? 'bg-white text-[#0A0A0A] border-4 border-[#0A0A0A]' 
                          : 'bg-[#0A0A0A] text-white border-4 border-white'
                      }`}>
                        <Star className="w-5 h-5" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`text-xl mt-4 mb-2 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {candidate.name}
                  </h3>
                  
                  <span className={`px-4 py-1.5 rounded-full shadow-lg ${
                    isDark 
                      ? 'bg-white text-[#0A0A0A]' 
                      : 'bg-[#0A0A0A] text-white'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className={`flex items-center justify-between ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className={isDark ? 'text-white' : 'text-black'}>
                        {candidate.rating}
                      </span>
                    </div>
                    <div>{candidate.projects} proyectos</div>
                  </div>
                  
                  <div className={`flex items-start gap-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <GraduationCap className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {candidate.career}
                      </div>
                      <div className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                        {candidate.university}
                      </div>
                      <div className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                        {candidate.semester}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span>{candidate.location}</span>
                  </div>
                </div>
                
                <p className={`mb-4 leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {candidate.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1.5 rounded-xl ${
                        isDark 
                          ? 'bg-white/5 border border-white/10 text-gray-300' 
                          : 'bg-gray-100 border border-gray-200 text-gray-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className={`flex-1 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isDark 
                      ? 'bg-white text-[#0A0A0A] hover:bg-gray-100' 
                      : 'bg-[#0A0A0A] text-white hover:bg-gray-900'
                  }`}>
                    <span className="flex items-center justify-center gap-2">
                      Ver Perfil
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </button>
                  <button className={`px-4 py-3 rounded-2xl transition-all ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                      : 'bg-gray-100 border border-gray-200 text-[#0A0A0A] hover:bg-gray-200'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCandidates.length === 0 && (
          <div className="text-center py-20">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-50 ${
              isDark ? 'bg-white/10' : 'bg-gray-200'
            }`}>
              <GraduationCap className={`w-10 h-10 ${isDark ? 'text-white' : 'text-gray-700'}`} />
            </div>
            <h3 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              No se encontraron candidatos
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </section>
  );
}