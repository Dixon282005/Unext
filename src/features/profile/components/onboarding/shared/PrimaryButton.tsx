import { ChevronRight } from 'lucide-react';

interface PrimaryButtonProps {
  disabled: boolean;
  onClick: () => void;
  text: string;
}

export function PrimaryButton({ disabled, onClick, text }: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
        disabled
          ? 'bg-white/5 text-gray-500 cursor-not-allowed'
          : 'bg-white text-black hover:bg-gray-200'
      }`}
    >
      {text}
      {!disabled && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}
