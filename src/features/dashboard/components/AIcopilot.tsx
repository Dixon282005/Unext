import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';

interface AICopilotProps {
  isDark: boolean;
  userType: 'student' | 'company';
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function AICopilot({ isDark, userType }: AICopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: userType === 'student'
        ? 'Hola! Soy tu asistente AI de Unext. Puedo ayudarte a mejorar tu perfil, prepararte para entrevistas, o encontrar oportunidades que se ajusten a tu perfil. Como puedo ayudarte hoy?'
        : 'Hola! Soy el asistente AI de Unext. Puedo ayudarte a optimizar tus vacantes, analizar candidatos, o sugerir estrategias de reclutamiento. Que necesitas?',
      timestamp: 'Ahora',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = userType === 'student'
    ? [
        'Basandome en tu perfil, las oportunidades en desarrollo frontend tienen un 95% de compatibilidad. Te recomiendo aplicar a TechCorp y StartupXYZ.',
        'Para mejorar tu perfil, te sugiero agregar tus proyectos recientes de React y obtener una certificacion en TypeScript. Esto aumentaria tu visibilidad un 40%.',
        'He analizado las tendencias del mercado: las habilidades mas demandadas son React, TypeScript, y cloud computing. Tu perfil ya cubre 2 de 3.',
        'Para tu proxima entrevista, te recomiendo prepararte en system design y algoritmos. Tengo recursos que pueden ayudarte.',
      ]
    : [
        'He analizado los candidatos disponibles. 3 perfiles coinciden al 90%+ con tu vacante de Frontend Developer. Te los muestro?',
        'Tu vacante de UX Designer ha recibido 32 aplicaciones. Te sugiero revisar los 5 candidatos con mayor match primero.',
        'Para mejorar la tasa de conversion de tu vacante, te recomiendo ajustar el rango salarial y agregar beneficios clave como trabajo remoto.',
        'Las metricas muestran que tus vacantes con descripcion detallada reciben 3x mas aplicaciones. Quieres que te ayude a optimizarlas?',
      ];

 const handleSend = async () => { // 1. Agregamos "async" aquí
    if (!input.trim()) return;

    // Guardamos el mensaje del usuario
    const userMessage: Message = {
      id: Date.now(), // Mejor usar Date.now() para evitar IDs duplicados
      role: 'user',
      content: input,
      timestamp: 'Ahora',
    };

    // Actualizamos la UI inmediatamente para que el usuario vea su mensaje
    setMessages(prev => [...prev, userMessage]);
    const mensajeAEnviar = input; // Guardamos el texto antes de limpiar el input
    setInput('');
    setIsTyping(true); // Aparecen los puntitos de carga...

    try {
      // 2. Llamada real al servidor de Python
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // Usamos el userType para separar historiales. 
          // En producción aquí iría el ID real del usuario de tu base de datos.
          user_id: userType === 'student' ? 'estudiante_prueba' : 'empresa_prueba', 
          message: mensajeAEnviar 
        })
      });

      const data = await response.json();

      // 3. Creamos el mensaje con la respuesta real de la IA
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply || "Lo siento, hubo un problema procesando tu mensaje.",
        timestamp: 'Ahora',
      };

      // Lo agregamos a la pantalla
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error conectando con Python:", error);
      // Si el servidor de Python está apagado, mostramos este error en el chat
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: '⚠️ No me pude conectar con el servidor de Unext. Verifica que Python esté corriendo en el puerto 5000.',
        timestamp: 'Ahora'
      }]);
    } finally {
      setIsTyping(false); // Quitamos los puntitos de carga
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-b from-purple-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 hover:from-purple-400 hover:to-purple-500 transition-all hover:scale-105 group"
      >
        <Bot className="w-5 h-5" />
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded
        ? 'bottom-6 right-6 w-[480px] h-[600px]'
        : 'bottom-6 right-6 w-[360px] h-[480px]'
    }`}>
      {/* Gradient glow behind */}
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-b from-purple-500/20 via-transparent to-purple-500/10 blur-sm pointer-events-none" />

      <div className={`relative w-full h-full rounded-lg border overflow-hidden flex flex-col glass-card ${
        isDark
          ? 'border-white/[0.08] bg-[#0A0A0A]/95'
          : 'border-black/[0.08] bg-white/95'
      }`}>
        {/* Header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between flex-shrink-0 ${
          isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-b from-purple-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h3 className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                AI Copilot
              </h3>
              <p className={`text-[10px] ${isDark ? 'text-[#8A8A8A]' : 'text-gray-400'}`}>
                Powered by Unext AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1 rounded-md transition-colors ${
                isDark ? 'hover:bg-white/[0.04] text-[#8A8A8A]' : 'hover:bg-black/[0.04] text-gray-400'
              }`}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded-md transition-colors ${
                isDark ? 'hover:bg-white/[0.04] text-[#8A8A8A]' : 'hover:bg-black/[0.04] text-gray-400'
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 rounded bg-gradient-to-b from-purple-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className={`text-[10px] ${isDark ? 'text-[#8A8A8A]' : 'text-gray-400'}`}>
                      Unext AI
                    </span>
                  </div>
                )}
                <div className={`inline-block px-3 py-2 rounded-lg text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-gradient-to-b from-purple-500 to-purple-600 text-white'
                    : isDark
                      ? 'bg-white/[0.04] text-gray-300'
                      : 'bg-black/[0.03] text-gray-600'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 rounded bg-gradient-to-b from-purple-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className={`text-[10px] ${isDark ? 'text-[#8A8A8A]' : 'text-gray-400'}`}>
                    Unext AI
                  </span>
                </div>
                <div className={`inline-block px-3 py-2 rounded-lg ${
                  isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]'
                }`}>
                  <div className="flex gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                    <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                    <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className={`px-4 py-2 border-t flex gap-1.5 overflow-x-auto ${
          isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
        }`}>
          {(userType === 'student'
            ? ['Mejora mi perfil', 'Oportunidades', 'Preparar entrevista']
            : ['Analizar candidatos', 'Optimizar vacante', 'Metricas']
          ).map((action) => (
            <button
              key={action}
              onClick={() => { setInput(action); }}
              className={`px-2 py-1 rounded text-[10px] flex-shrink-0 transition-colors ${
                isDark
                  ? 'bg-white/[0.04] text-[#8A8A8A] hover:text-white hover:bg-white/[0.08]'
                  : 'bg-black/[0.03] text-gray-500 hover:text-[#0A0A0A] hover:bg-black/[0.06]'
              }`}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={`p-3 border-t flex-shrink-0 ${
          isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
        }`}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta algo a tu AI Copilot..."
              className={`flex-1 px-3 py-2 text-sm rounded-lg ${
                isDark
                  ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500'
                  : 'bg-black/[0.02] border border-black/[0.08] text-[#0A0A0A] placeholder-gray-400'
              } focus:outline-none focus:border-purple-500 transition-colors`}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-gradient-to-b from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
