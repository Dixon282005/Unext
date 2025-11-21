"use client";

import { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Briefcase, Bookmark, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OpportunitiesProps {
  isDark: boolean;
}

export function Opportunities({ isDark }: OpportunitiesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const opportunities = [
    {
      id: 1,
      title: 'Pasante de Marketing Digital',
      company: 'Innovatech Solutions',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      location: 'Buenos Aires, Argentina',
      type: 'Pasantía',
      duration: '6 meses',
      salary: '$50K - $70K/mes',
      description: 'Buscamos talento apasionado por el marketing digital para unirse a nuestro equipo innovador.',
      skills: ['Social Media', 'Analytics', 'SEO'],
      featured: true
    },
    {
      id: 2,
      title: 'Desarrollador Frontend Junior',
      company: 'CodeFactory',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
      location: 'Santiago, Chile',
      type: 'Primer Empleo',
      duration: 'Tiempo completo',
      salary: '$800K - $1.2M/mes',
      description: 'Únete a nuestro equipo y trabaja en proyectos innovadores con tecnología de punta.',
      skills: ['React', 'TypeScript', 'Tailwind'],
      featured: true
    },
    {
      id: 3,
      title: 'Analista de Datos',
      company: 'DataInsights Pro',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
      location: 'Ciudad de México, México',
      type: 'Práctica Profesional',
      duration: '3 meses',
      salary: '$12K - $15K/mes',
      description: 'Aprende sobre análisis de datos en un entorno profesional de alto impacto.',
      skills: ['Python', 'SQL', 'Power BI'],
      featured: false
    },
    {
      id: 4,
      title: 'Diseñador UX/UI',
      company: 'Creative Studio',
      logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
      location: 'Bogotá, Colombia',
      type: 'Pasantía',
      duration: '4 meses',
      salary: '$1.5M - $2M/mes',
      description: 'Diseña experiencias digitales increíbles para clientes globales.',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      featured: false
    },
    {
      id: 5,
      title: 'Ingeniero de Software',
      company: 'TechVentures',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
      location: 'Montevideo, Uruguay',
      type: 'Primer Empleo',
      duration: 'Tiempo completo',
      salary: '$45K - $60K/mes',
      description: 'Desarrolla soluciones innovadoras en un ambiente ágil y colaborativo.',
      skills: ['Python', 'AWS', 'Docker'],
      featured: false
    },
    {
      id: 6,
      title: 'Especialista en RRHH',
      company: 'TalentHub',
      logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop',
      location: 'Lima, Perú',
      type: 'Práctica Profesional',
      duration: '5 meses',
      salary: '$1.2K - $1.8K/mes',
      description: 'Gestión de talento y desarrollo organizacional en empresa líder.',
      skills: ['Recruitment', 'HR Analytics', 'Coaching'],
      featured: false
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || opp.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || opp.location.includes(selectedLocation);
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]">
          <h1 className={`text-5xl mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Descubre tu próxima{' '}
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              oportunidad
            </span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredOpportunities.length} oportunidades disponibles para ti
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className={`backdrop-blur-xl p-6 rounded-3xl mb-8 transition-all duration-500 opacity-0 animate-[fadeIn_0.8s_ease-in-out_0.2s_forwards] ${
          isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white border border-gray-200 shadow-lg'
        }`}>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Buscar por puesto o empresa..."
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`px-4 py-3 rounded-2xl transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white focus:border-white/30' 
                  : 'bg-gray-50 border border-gray-200 text-black focus:border-gray-400'
              }`}
            >
              <option value="all" className={isDark ? 'bg-black' : 'bg-white'}>Todos los tipos</option>
              <option value="Pasantía" className={isDark ? 'bg-black' : 'bg-white'}>Pasantía</option>
              <option value="Práctica Profesional" className={isDark ? 'bg-black' : 'bg-white'}>Práctica Profesional</option>
              <option value="Primer Empleo" className={isDark ? 'bg-black' : 'bg-white'}>Primer Empleo</option>
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`px-4 py-3 rounded-2xl transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white focus:border-white/30' 
                  : 'bg-gray-50 border border-gray-200 text-black focus:border-gray-400'
              }`}
            >
              <option value="all" className={isDark ? 'bg-black' : 'bg-white'}>Todas las ubicaciones</option>
              <option value="Argentina" className={isDark ? 'bg-black' : 'bg-white'}>Argentina</option>
              <option value="Chile" className={isDark ? 'bg-black' : 'bg-white'}>Chile</option>
              <option value="México" className={isDark ? 'bg-black' : 'bg-white'}>México</option>
              <option value="Colombia" className={isDark ? 'bg-black' : 'bg-white'}>Colombia</option>
              <option value="Perú" className={isDark ? 'bg-black' : 'bg-white'}>Perú</option>
              <option value="Uruguay" className={isDark ? 'bg-black' : 'bg-white'}>Uruguay</option>
            </select>
          </div>
        </div>
        
        {/* Opportunities Grid */}
        <div className="grid gap-6">
          {filteredOpportunities.map((opportunity, index) => (
            <div 
              key={opportunity.id} 
              className={`group relative backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards] ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                  : 'bg-white border border-gray-200 hover:border-purple-600/30 hover:shadow-xl'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {opportunity.featured && (
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-2 rounded-full shadow-lg ${
                    isDark 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-700 text-white'
                  }`}>
                    Destacado
                  </span>
                </div>
              )}
              
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <ImageWithFallback
                    src={opportunity.logo}
                    alt={opportunity.company}
                    className={`w-20 h-20 rounded-2xl object-cover transition-colors ${
                      isDark ? 'border border-white/20' : 'border border-gray-200'
                    }`}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-2xl mb-2 ${
                        isDark ? 'text-white' : 'text-[#0A0A0A]'
                      }`}>
                        {opportunity.title}
                      </h3>
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {opportunity.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex flex-wrap gap-4 mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{opportunity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{opportunity.salary}</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      isDark 
                        ? 'bg-white text-[#0A0A0A]' 
                        : 'bg-[#0A0A0A] text-white'
                    }`}>
                      <Briefcase className="w-4 h-4" />
                      <span>{opportunity.type}</span>
                    </div>
                  </div>
                  
                  <p className={`mb-6 leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {opportunity.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={`px-4 py-2 rounded-xl transition-colors ${
                          isDark 
                            ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10' 
                            : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button className={`group/btn px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                      isDark 
                        ? 'bg-white text-[#0A0A0A] hover:bg-gray-100' 
                        : 'bg-[#0A0A0A] text-white hover:bg-gray-900'
                    }`}>
                      <span>Postularme ahora</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className={`px-6 py-3 rounded-2xl transition-all flex items-center gap-2 ${
                      isDark 
                        ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                        : 'bg-gray-100 border border-gray-200 text-[#0A0A0A] hover:bg-gray-200'
                    }`}>
                      <Bookmark className="w-5 h-5" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-20">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-50 ${
              isDark ? 'bg-white/10' : 'bg-gray-200'
            }`}>
              <Briefcase className={`w-10 h-10 ${isDark ? 'text-white' : 'text-gray-700'}`} />
            </div>
            <h3 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              No se encontraron oportunidades
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