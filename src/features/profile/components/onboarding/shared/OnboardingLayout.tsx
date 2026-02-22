import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  children: React.ReactNode;
}

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 50 : -50, opacity: 0 }),
};

export { variants };

export function OnboardingLayout({ currentStep, totalSteps, onBack, canGoBack, children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/20 blur-[120px] pointer-events-none rounded-full" />

      {/* Progress header */}
      <div className="w-full max-w-2xl mx-auto pt-10 px-6 relative z-10 shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={`p-2 rounded-full transition-colors ${
              !canGoBack ? 'opacity-0 cursor-default' : 'hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
              <span>Paso {currentStep} de {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completado</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center pb-20 px-6 relative z-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={1}>
            {children}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
