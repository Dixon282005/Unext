import { Trophy, Clock, Users, ArrowRight, Zap } from 'lucide-react';

interface FeaturedChallengeProps {
  isDark: boolean;
}

export function FeaturedChallenge({ isDark }: FeaturedChallengeProps) {
  const challenges = [
    {
      id: 1,
      title: 'Frontend Architecture Challenge',
      company: 'TechCorp',
      difficulty: 'Avanzado',
      participants: 234,
      timeLeft: '2d 14h',
      reward: '$5,000 MXN',
      tags: ['React', 'System Design', 'Performance'],
      progress: 65,
    },
    {
      id: 2,
      title: 'Data Pipeline Optimization',
      company: 'DataFlow',
      difficulty: 'Intermedio',
      participants: 156,
      timeLeft: '5d 8h',
      reward: '$3,500 MXN',
      tags: ['Python', 'SQL', 'ETL'],
      progress: 30,
    },
  ];

  return (
    <div className={`rounded-lg border glass-card overflow-hidden ${
      isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]'
    }`}>
      <div className={`px-5 py-4 border-b flex items-center justify-between ${
        isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <h3 className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Retos Destacados
          </h3>
        </div>
        <button className={`text-xs flex items-center gap-1 transition-colors ${
          isDark ? 'text-[#8A8A8A] hover:text-white' : 'text-gray-400 hover:text-[#0A0A0A]'
        }`}>
          Ver todos <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="divide-y divide-transparent">
        {challenges.map((challenge) => (
          <div key={challenge.id} className={`px-5 py-4 transition-colors ${
            isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.01]'
          }`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`text-sm truncate ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {challenge.title}
                  </h4>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] flex-shrink-0 ${
                    challenge.difficulty === 'Avanzado'
                      ? 'bg-purple-500/10 text-purple-500'
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                  por {challenge.company}
                </p>
              </div>
              <span className={`text-xs tabular-nums ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                {challenge.reward}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {challenge.tags.map((tag) => (
                <span key={tag} className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isDark ? 'bg-white/[0.04] text-[#8A8A8A]' : 'bg-black/[0.03] text-gray-500'
                }`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <span className={`flex items-center gap-1 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                  <Users className="w-3 h-3" /> {challenge.participants}
                </span>
                <span className={`flex items-center gap-1 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                  <Clock className="w-3 h-3" /> {challenge.timeLeft}
                </span>
              </div>
              <button className="px-3 py-1.5 rounded-lg text-xs bg-gradient-to-b from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 transition-all flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                Participar
              </button>
            </div>

            {/* Progress bar */}
            <div className={`mt-3 h-1 rounded-full overflow-hidden ${
              isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
