import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check } from 'lucide-react';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';

export function TStep7Document({ formData, updateData, onNext }: StepProps<TalentOnboardingData> & { onNext: () => void }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) updateData({ file: e.dataTransfer.files[0] });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) updateData({ file: e.target.files[0] });
  };

  return (
    <motion.div key="t7" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Documento Profesional</h1>
        <p className="text-gray-400">Adjunte su CV o Portafolio. (Opcional)</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all flex flex-col items-center justify-center min-h-[200px] ${
          isDragging ? 'border-purple-500 bg-purple-500/10'
          : formData.file ? 'border-green-500/50 bg-green-500/5'
          : 'border-white/10 hover:border-white/20 bg-white/2'
        }`}
      >
        <input type="file" id="cv-upload" className="hidden" accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleSelect} />
        {formData.file ? (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto"><Check className="w-6 h-6" /></div>
            <div className="text-sm font-medium text-white">{formData.file.name}</div>
            <div className="text-xs text-green-400">Archivo adjuntado correctamente</div>
            <button onClick={() => updateData({ file: null })} className="text-xs text-gray-400 hover:text-white underline mt-2">Eliminar archivo</button>
          </div>
        ) : (
          <label htmlFor="cv-upload" className="cursor-pointer space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-400"><Upload className="w-5 h-5" /></div>
            <div><span className="text-purple-400 font-medium hover:text-purple-300">Explorar archivos</span><span className="text-gray-400"> o arrastrar aquí</span></div>
            <p className="text-xs text-gray-600">PDF, DOC, PNG o JPG (Máx 5MB)</p>
          </label>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <PrimaryButton disabled={false} onClick={onNext} text={formData.file ? 'Finalizar Configuración' : 'Finalizar Perfil'} />
        {!formData.file && (
          <button onClick={onNext} className="text-sm text-gray-500 hover:text-white transition-colors py-2">
            Subir más tarde e ir al Dashboard
          </button>
        )}
      </div>
    </motion.div>
  );
}
