import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Zap, FileText, Code, Lightbulb, RotateCcw } from 'lucide-react';

interface AIWorkspaceProps {
  isDark: boolean;
}

interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
  actions?: string[];
}

const aiResponses: Record<string, string> = {
  'Optimizar mi perfil': `He analizado tu perfil y encontré **3 áreas de mejora**:

1. **Descripción profesional** — Tu resumen actual es genérico. Te sugiero: "Desarrollador Frontend con 2+ años de experiencia en React, TypeScript y sistemas de diseño. Enfocado en rendimiento y accesibilidad."

2. **Skills destacadas** — Agrega "Next.js" y "Testing (Jest/Cypress)" — son las más buscadas por empresas esta semana (+34% en demanda).

3. **Portafolio** — Tu proyecto "Dashboard Analytics" no tiene demo en vivo. Los perfiles con demos reciben 2.8x más vistas.

¿Quieres que aplique estos cambios automáticamente?`,

  'Preparar entrevista': `Te preparo para tu entrevista con **TechCorp** (Frontend Developer):

**Preguntas técnicas probables:**
- Explica el ciclo de vida de un componente React
- ¿Cómo optimizarías una app con re-renders excesivos?
- Describe tu experiencia con TypeScript generics

**Preguntas conductuales:**
- Cuéntame sobre un proyecto desafiante y cómo lo resolviste
- ¿Cómo manejas el feedback negativo en code reviews?

**Tips de la empresa:**
- TechCorp valora la comunicación asíncrona (usan Notion + Linear)
- Su stack principal es React + GraphQL + PostgreSQL
- Cultura remota-first, enfocados en ownership

¿Quieres que simulemos una entrevista técnica?`,

  'Análisis de mercado': `**Reporte del mercado laboral — Febrero 2026:**

→ **Frontend Development** sigue en alta demanda (+18% vs mes anterior)
→ Las vacantes remotas representan el 67% del total en LATAM
→ Salario promedio Frontend Sr: $2,800 USD/mes (↑ 8%)
→ TypeScript es requisito en el 82% de las posiciones
→ Next.js superó a Vue como el segundo framework más solicitado

**Tu posición:**
Estás en el percentil 78 de candidatos de tu área. Para llegar al top 10%, te recomiendo:
- Completar un proyecto con Next.js App Router
- Contribuir a un proyecto open source
- Obtener la certificación de AWS Cloud Practitioner`,

  'Revisar aplicaciones': `**Estado de tus aplicaciones activas:**

| Empresa | Posición | Estado | Match |
|---------|----------|--------|-------|
| TechCorp | Frontend Dev | Entrevista pendiente | 95% |
| DesignHub | UX/UI | En revisión | 88% |
| DataFlow | Backend | Aplicado | 82% |
| StartupXYZ | Full Stack | Sin respuesta (3d) | 90% |

**Recomendación:** StartupXYZ no ha respondido en 3 días. Te sugiero enviar un follow-up corto y profesional. ¿Quieres que redacte uno?`,

  'Sugerir mensaje': `Aquí tienes un template para el follow-up a StartupXYZ:

---
Hola equipo de StartupXYZ,

Espero que estén bien. Les escribo para darle seguimiento a mi aplicación para la posición de Full Stack Developer (enviada el 17 de febrero).

Sigo muy interesado en la oportunidad y me encantaría conocer más sobre el equipo y los proyectos en los que estarían trabajando.

Quedo atento a cualquier actualización.

Saludos cordiales,
Juan Díaz
---

¿Lo envío directamente desde la plataforma?`,

  'default': `Entiendo tu consulta. Basándome en tu perfil y actividad reciente, te puedo ayudar con:

- **Optimización de perfil** — mejorar tu visibilidad en la plataforma
- **Preparación de entrevistas** — simulaciones y tips personalizados
- **Análisis de oportunidades** — matchear vacantes con tu perfil
- **Estrategia de carrera** — plan de desarrollo profesional

¿Sobre qué tema quieres profundizar?`,
};

const quickPrompts = [
  { label: 'Optimizar mi perfil', icon: Sparkles },
  { label: 'Preparar entrevista', icon: Zap },
  { label: 'Análisis de mercado', icon: FileText },
  { label: 'Revisar aplicaciones', icon: Code },
  { label: 'Sugerir mensaje', icon: Lightbulb },
];

export function AIWorkspace({ isDark }: AIWorkspaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'system',
      content: 'Sesión iniciada — AI Workspace v2.1',
    },
    {
      id: 1,
      role: 'assistant',
      content: 'Hola Juan. Soy tu asistente de Unext AI. Puedo ayudarte a optimizar tu perfil, prepararte para entrevistas, analizar oportunidades o revisar tus aplicaciones. ¿En qué te puedo ayudar hoy?',
      actions: ['Optimizar mi perfil', 'Preparar entrevista', 'Análisis de mercado'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const border = isDark ? 'border-[#222]' : 'border-[#eaeaea]';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const textFaint = isDark ? 'text-[#555]' : 'text-[#999]';
  const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (streamRef.current) clearTimeout(streamRef.current);
    };
  }, []);

  const simulateStream = useCallback((fullText: string, withActions?: string[]) => {
    setIsStreaming(true);
    const id = Date.now() + 1;
    setMessages(prev => [...prev, { id, role: 'assistant', content: '', isStreaming: true }]);

    let charIndex = 0;
    const stream = () => {
      if (charIndex < fullText.length) {
        const charsToAdd = Math.min(3 + Math.floor(Math.random() * 4), fullText.length - charIndex);
        const newContent = fullText.slice(0, charIndex + charsToAdd);
        charIndex += charsToAdd;
        setMessages(prev =>
          prev.map(m => m.id === id ? { ...m, content: newContent } : m)
        );
        streamRef.current = window.setTimeout(stream, 10 + Math.random() * 20);
      } else {
        setMessages(prev =>
          prev.map(m => m.id === id ? { ...m, isStreaming: false, actions: withActions } : m)
        );
        setIsStreaming(false);
      }
    };
    streamRef.current = window.setTimeout(stream, 400);
  }, []);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isStreaming) return;

    // 1. Mostramos el mensaje del usuario en la pantalla
    const userMsg: Message = { id: Date.now(), role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Bloqueamos el input mientras la IA piensa
    setIsStreaming(true); 

    try {
      // 2. Llamamos al "Cerebro" de Python
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: 'workspace_user', // ID temporal
          message: msg 
        })
      });

      const data = await response.json();

      // 3. ¡Aquí ocurre la magia! 
      // Le pasamos la respuesta real de Ollama a tu efecto de máquina de escribir
      // Pasamos false a setIsStreaming para que la función simulateStream tome el control
      setIsStreaming(false); 
      simulateStream(data.reply || "Procesamiento completado sin respuesta.");

    } catch (error) {
      console.error("Error conectando con el servidor local:", error);
      setIsStreaming(false);
      
      // Mensaje de error formateado para tu UI estilo consola
      simulateStream("`ERROR 500:` Fallo de conexión con el motor de IA local en el puerto 5000. Verifica el servidor Flask.");
    }
  };

  const handleClear = () => {
    if (streamRef.current) clearTimeout(streamRef.current);
    setIsStreaming(false);
    setMessages([
      { id: 0, role: 'system', content: 'Sesión reiniciada — AI Workspace v2.1' },
      { id: Date.now(), role: 'assistant', content: 'Conversación limpia. ¿En qué puedo ayudarte?' },
    ]);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold
      const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="' + (isDark ? 'text-white' : 'text-black') + '">$1</strong>');
      // Code blocks
      const codeFormatted = boldFormatted.replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded text-[10px] ' + (isDark ? 'bg-[#1a1a1a] text-purple-400' : 'bg-[#f0f0f0] text-purple-600') + '">$1</code>');
      // Headings
      if (line.startsWith('---')) {
        return <hr key={i} className={`my-2 ${isDark ? 'border-[#222]' : 'border-[#eee]'}`} />;
      }
      if (line.startsWith('| ')) {
        return (
          <div key={i} className={`text-[10px] py-0.5 ${isDark ? 'text-[#aaa]' : 'text-[#555]'}`} style={{ fontFamily: 'monospace' }}>
            {line}
          </div>
        );
      }
      return (
        <div key={i} className={line === '' ? 'h-2' : ''} dangerouslySetInnerHTML={{ __html: codeFormatted }} />
      );
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-lg ${text} tracking-tight`}>AI Workspace</h1>
            <p className={`text-xs ${textMuted}`}>Tu asistente inteligente para impulsar tu carrera</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] border ${border} ${textMuted} hover:${text} transition-colors`}
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className={`text-[10px] ${textMuted}`}>AI en línea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {quickPrompts.map((qp) => {
            const Icon = qp.icon;
            return (
              <button
                key={qp.label}
                onClick={() => handleSend(qp.label)}
                disabled={isStreaming}
                className={`p-3 rounded-lg border ${border} ${cardBg} text-left transition-all hover:border-purple-500/30 group disabled:opacity-50`}
              >
                <Icon className={`w-4 h-4 mb-2 ${textFaint} group-hover:text-purple-500 transition-colors`} />
                <span className={`text-[11px] ${text} block`}>{qp.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Chat Container */}
      <div className={`flex-1 rounded-lg border ${border} ${cardBg} flex flex-col overflow-hidden`}>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === 'system' ? (
                <div className="flex items-center gap-2 py-1">
                  <div className={`flex-1 h-px ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#eee]'}`} />
                  <span className={`text-[9px] ${textFaint} px-2`} style={{ fontFamily: 'monospace' }}>{msg.content}</span>
                  <div className={`flex-1 h-px ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#eee]'}`} />
                </div>
              ) : msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="flex items-start gap-2 max-w-[75%]">
                    <div className={`px-4 py-2.5 rounded-xl text-xs leading-relaxed ${
                      isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f0f0f0] text-black'
                    }`}>
                      {msg.content}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-[8px] flex-shrink-0 mt-0.5">
                      JD
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1L2 3v4l3 2 3-2V3L5 1z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] ${textMuted}`} style={{ fontFamily: 'monospace' }}>unext-ai</span>
                      {msg.isStreaming && (
                        <span className="text-[9px] text-purple-500 animate-pulse">generando...</span>
                      )}
                    </div>
                    <div
                      className={`text-xs leading-relaxed ${isDark ? 'text-[#bbb]' : 'text-[#444]'}`}
                      style={{ fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace', lineHeight: '1.7' }}
                    >
                      {formatContent(msg.content)}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-4 bg-purple-500 ml-0.5 animate-pulse rounded-sm" />
                      )}
                    </div>
                    {/* Action buttons */}
                    {msg.actions && !msg.isStreaming && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {msg.actions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSend(action)}
                            disabled={isStreaming}
                            className={`px-3 py-1.5 rounded-md text-[10px] border ${border} ${textMuted} transition-all hover:border-purple-500/30 hover:text-purple-400 disabled:opacity-50`}
                            style={{ fontFamily: 'monospace' }}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${border}`}>
          <div className={`flex items-center gap-3 rounded-lg border ${border} ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#fafafa]'} transition-colors focus-within:border-purple-500/40 px-4`}>
            <span className={`text-xs ${textFaint} select-none`} style={{ fontFamily: 'monospace' }}>~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
              disabled={isStreaming}
              className={`flex-1 py-3 text-sm bg-transparent ${text} placeholder:${textFaint} focus:outline-none disabled:opacity-50`}
              style={{ fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isStreaming}
              className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className={`flex items-center justify-between mt-2 text-[9px] ${textFaint}`}>
            <span style={{ fontFamily: 'monospace' }}>AI puede cometer errores. Verifica la información importante.</span>
            <span style={{ fontFamily: 'monospace' }}>Enter para enviar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
