import { useState } from 'react';
import { Heart, X, MapPin, Briefcase, Star, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IntelligentMatchProps {
  isDark: boolean;
  userType: 'student' | 'company';
}

export function IntelligentMatch({ isDark, userType }: IntelligentMatchProps) {
  const studentMatches = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'Remoto', match: 95, type: 'Tiempo completo', salary: '$25K-$35K', skills: ['React', 'TypeScript', 'Tailwind'] },
    { id: 2, title: 'Product Designer', company: 'InnovateLab', location: 'Guadalajara', match: 88, type: 'Tiempo completo', salary: '$23K-$33K', skills: ['Figma', 'Design Systems', 'Research'] },
    { id: 3, title: 'Full Stack Developer', company: 'StartupXYZ', location: 'Remoto', match: 90, type: 'Tiempo completo', salary: '$22K-$32K', skills: ['React', 'Node.js', 'MongoDB'] },
    { id: 4, title: 'DevOps Engineer', company: 'CloudTech', location: 'Remoto', match: 78, type: 'Tiempo completo', salary: '$28K-$38K', skills: ['AWS', 'Kubernetes', 'Docker'] },
  ];

  const companyMatches = [
    { id: 1, title: 'Carlos Garcia', company: 'Ing. en Computacion', location: 'CDMX', match: 95, type: '5 anos exp.', salary: 'React, TypeScript', skills: ['React', 'TypeScript', 'AWS'] },
    { id: 2, title: 'Ana Martinez', company: 'Diseno Grafico', location: 'Remoto', match: 88, type: '4 anos exp.', salary: 'Figma, Adobe', skills: ['Figma', 'Adobe XD', 'Sketch'] },
    { id: 3, title: 'Luis Rodriguez', company: 'Ing. en Software', location: 'Monterrey', match: 92, type: '6 anos exp.', salary: 'Node.js, Python', skills: ['Node.js', 'Python', 'PostgreSQL'] },
  ];

  const matches = userType === 'student' ? studentMatches : companyMatches;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [passed, setPassed] = useState<number[]>([]);

  const currentMatch = matches[currentIndex % matches.length];

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    if (dir === 'right') {
      setLiked(prev => [...prev, currentMatch.id]);
    } else {
      setPassed(prev => [...prev, currentMatch.id]);
    }
    setTimeout(() => {
      setDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setLiked([]);
    setPassed([]);
  };

  return (
    <div className={`rounded-lg border glass-card overflow-hidden ${
      isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]'
    }`}>
      <div className={`px-5 py-4 border-b flex items-center justify-between ${
        isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <h3 className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Match Inteligente
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs tabular-nums ${isDark ? 'text-[#8A8A8A]' : 'text-gray-400'}`}>
            {liked.length} likes
          </span>
          <button
            onClick={handleReset}
            className={`p-1 rounded-md transition-colors ${
              isDark ? 'hover:bg-white/[0.04] text-[#8A8A8A]' : 'hover:bg-black/[0.04] text-gray-400'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="relative h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
                rotate: direction === 'left' ? -10 : direction === 'right' ? 10 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className={`w-full rounded-lg border p-5 ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.03]'
                  : 'border-black/[0.08] bg-black/[0.02]'
              }`}
            >
              {/* Match percentage */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                    isDark ? 'bg-white/[0.06] text-gray-400' : 'bg-black/[0.04] text-gray-500'
                  }`}>
                    {currentMatch.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                      {currentMatch.title}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                      {currentMatch.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-purple-500 fill-purple-500" />
                  <span className={`text-sm tabular-nums ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {currentMatch.match}%
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                <span className={`flex items-center gap-1 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                  <MapPin className="w-3 h-3" /> {currentMatch.location}
                </span>
                <span className={`flex items-center gap-1 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                  <Briefcase className="w-3 h-3" /> {currentMatch.type}
                </span>
              </div>

              <p className={`text-xs mb-4 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                {currentMatch.salary}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {currentMatch.skills.map((skill) => (
                  <span key={skill} className={`px-2 py-0.5 rounded text-[10px] ${
                    isDark ? 'bg-white/[0.04] text-[#8A8A8A]' : 'bg-black/[0.03] text-gray-500'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Match bar */}
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${isDark ? 'text-[#8A8A8A]' : 'text-gray-400'}`}>Compatibilidad</span>
                <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'
                }`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all"
                    style={{ width: `${currentMatch.match}%` }}
                  />
                </div>
                <span className={`text-[10px] tabular-nums ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                  {currentMatch.match}%
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => handleSwipe('left')}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-105 ${
              isDark
                ? 'border-white/[0.08] text-[#8A8A8A] hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5'
                : 'border-black/[0.08] text-gray-400 hover:border-red-500/30 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 bg-gradient-to-b from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500 shadow-lg shadow-purple-500/20`}
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
