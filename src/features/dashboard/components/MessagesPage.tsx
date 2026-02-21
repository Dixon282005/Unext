import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Send, Phone, Video, Paperclip, Smile, Image,
  Mic, MoreVertical, Check, CheckCheck, ArrowLeft, Pin
} from 'lucide-react';

interface MessagesPageProps {
  isDark: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  role: string;
  pinned?: boolean;
}

interface ChatMessage {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
  read: boolean;
  date?: string;
}

const conversations: Conversation[] = [
  { id: 1, name: 'TechCorp Internacional', avatar: 'TC', lastMessage: '¿Cuándo podemos agendar la entrevista?', time: '10m', unread: 2, online: true, role: 'Recruiter — Senior Frontend', pinned: true },
  { id: 2, name: 'DesignHub Studio', avatar: 'DH', lastMessage: 'Nos gustó mucho tu portfolio, queremos seguir adelante', time: '2h', unread: 0, online: false, role: 'Lead Designer — UX/UI Position', pinned: true },
  { id: 3, name: 'DataFlow Technologies', avatar: 'DF', lastMessage: 'Revisamos tu solicitud y nos encantaría conversar', time: '1d', unread: 1, online: true, role: 'Engineering Manager — Backend', pinned: false },
  { id: 4, name: 'StartupXYZ', avatar: 'SX', lastMessage: 'Hola Juan! Recibimos tu aplicación y queremos conocerte', time: '2d', unread: 0, online: false, role: 'CTO — Full Stack Developer', pinned: false },
  { id: 5, name: 'CloudTech Solutions', avatar: 'CT', lastMessage: 'Gracias por tu interés. Te compartimos más detalles del rol', time: '3d', unread: 0, online: false, role: 'HR Lead — DevOps Engineer', pinned: false },
  { id: 6, name: 'FinFlow', avatar: 'FF', lastMessage: '¡Bienvenido! Queremos platicarte sobre la oportunidad', time: '5d', unread: 0, online: true, role: 'VP Engineering — Mobile Dev', pinned: false },
  { id: 7, name: 'NeuraLabs AI', avatar: 'NL', lastMessage: 'Nos impresionó tu perfil. ¿Tienes experiencia con PyTorch?', time: '1sem', unread: 0, online: false, role: 'ML Lead — Data Science', pinned: false },
];

const chatMessagesMap: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, sender: 'them', text: 'Hola Juan, gracias por tu interés en la posición de Senior Frontend Developer', time: '10:30', read: true, date: 'Hoy' },
    { id: 2, sender: 'them', text: 'Revisamos tu perfil y portfolio, y estamos muy impresionados con tu experiencia en React y TypeScript. Tu proyecto del Design System nos pareció particularmente interesante.', time: '10:31', read: true },
    { id: 3, sender: 'them', text: 'Nos encantaría agendar una entrevista técnica contigo para conocerte mejor y evaluar el fit con nuestro equipo 🚀', time: '10:32', read: true },
    { id: 4, sender: 'me', text: '¡Hola! Muchas gracias por considerarme 😊', time: '10:35', read: true },
    { id: 5, sender: 'me', text: 'Me emociona mucho la oportunidad. He estado siguiendo a TechCorp por un tiempo y admiro mucho el producto que están construyendo.', time: '10:35', read: true },
    { id: 6, sender: 'me', text: 'Estoy disponible esta semana. ¿Qué días les vendría bien para la entrevista? Puedo adaptarme a cualquier horario.', time: '10:36', read: true },
    { id: 7, sender: 'them', text: 'Excelente! Tenemos disponibilidad el miércoles o viernes de esta semana.', time: '10:38', read: true },
    { id: 8, sender: 'them', text: 'La entrevista sería de aproximadamente 1 hora con nuestro Tech Lead, David. Te enviaría un link de Google Meet.', time: '10:38', read: true },
    { id: 9, sender: 'me', text: 'Perfecto, el miércoles me viene muy bien 👍', time: '10:39', read: true },
    { id: 10, sender: 'me', text: '¿A qué hora están pensando? Preferiblemente por la mañana si es posible.', time: '10:39', read: true },
    { id: 11, sender: 'them', text: '¿Te parece bien a las 11am hora CDMX? Te envío la invitación de calendario.', time: '10:40', read: false },
    { id: 12, sender: 'them', text: '¿Cuándo podemos agendar la entrevista?', time: '10:41', read: false },
  ],
  2: [
    { id: 1, sender: 'them', text: 'Hola Juan! Soy Ana de DesignHub Studio. Recibimos tu aplicación para la posición de UX/UI Product Designer.', time: '14:20', read: true, date: 'Ayer' },
    { id: 2, sender: 'them', text: 'Revisamos tu portfolio detenidamente. El case study de tu Dashboard Analytics y el Design System nos parecieron sobresalientes.', time: '14:22', read: true },
    { id: 3, sender: 'me', text: '¡Hola Ana! Muchas gracias, me alegra saber que les gustó mi trabajo. DesignHub es una de las agencias que más admiro en México.', time: '14:30', read: true },
    { id: 4, sender: 'them', text: 'Nos gustó mucho tu portfolio, queremos seguir adelante con el proceso. El siguiente paso sería una presentación de un caso de estudio.', time: '14:35', read: true },
    { id: 5, sender: 'me', text: '¡Me encanta! Estoy lista para el challenge. ¿Me pueden compartir más detalles sobre el formato?', time: '14:40', read: true },
  ],
  3: [
    { id: 1, sender: 'them', text: 'Hola Juan, soy Carlos, Engineering Manager en DataFlow Technologies.', time: '09:15', read: true, date: 'Lun 17 Feb' },
    { id: 2, sender: 'them', text: 'Revisamos tu solicitud para la posición de Backend Engineer y nos encantaría conversar contigo. Tu experiencia con Node.js y TypeScript es justo lo que buscamos.', time: '09:16', read: true },
    { id: 3, sender: 'me', text: 'Hola Carlos! Gracias por contactarme. Me interesa mucho la posición, especialmente la parte de procesamiento de datos en tiempo real.', time: '11:00', read: true },
    { id: 4, sender: 'them', text: 'Genial! Te cuento un poco más: estamos procesando ~2M eventos/minuto y necesitamos escalar a 10M. ¿Te suena interesante? 🔥', time: '11:15', read: true },
    { id: 5, sender: 'them', text: 'Revisamos tu solicitud y nos encantaría conversar', time: '11:16', read: false },
  ],
  4: [
    { id: 1, sender: 'them', text: 'Hola Juan! Soy Miguel, CTO de StartupXYZ. Recibimos tu aplicación y queremos conocerte.', time: '16:00', read: true, date: 'Sáb 15 Feb' },
    { id: 2, sender: 'them', text: 'Somos un equipo pequeño (5 ingenieros) y buscamos a alguien que quiera ownership real sobre features end-to-end. ¿Te interesa?', time: '16:02', read: true },
    { id: 3, sender: 'me', text: 'Hola Miguel! Me llama mucho la atención su startup. El equity y la cultura remote-first son muy atractivos para mí.', time: '17:00', read: true },
    { id: 4, sender: 'them', text: 'Hola Juan! Recibimos tu aplicación y queremos conocerte', time: '17:05', read: true },
  ],
};

export function MessagesPage({ isDark }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState<Record<number, ChatMessage[]>>(chatMessagesMap);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const border = isDark ? 'border-[#333]' : 'border-[#eaeaea]';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const textFaint = isDark ? 'text-[#555]' : 'text-[#999]';
  const hoverBg = isDark ? 'hover:bg-[#111]' : 'hover:bg-[#f5f5f5]';
  const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const inputBg = isDark ? 'bg-[#111]' : 'bg-[#fafafa]';

  const currentConvo = conversations.find(c => c.id === selectedConversation);
  const currentMessages = localMessages[selectedConversation] || [];

  const filteredConversations = conversations.filter(c =>
    searchQuery === '' || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedConvos = filteredConversations.filter(c => c.pinned);
  const otherConvos = filteredConversations.filter(c => !c.pinned);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isTyping]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: 'me',
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setLocalMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMsg],
    }));
    setMessageInput('');
    setIsTyping(true);

    // Simulate reply
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        'Perfecto, lo tengo anotado. Te confirmo en breve.',
        '¡Genial! Muchas gracias por tu respuesta, Juan.',
        'Entendido. Te envío más detalles por correo.',
        'Excelente, nos vemos entonces. ¡Mucho éxito!',
        'Gracias Juan. ¿Tienes alguna pregunta adicional?',
      ];
      const reply: ChatMessage = {
        id: Date.now() + 1,
        sender: 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setLocalMessages(prev => ({
        ...prev,
        [selectedConversation]: [...(prev[selectedConversation] || []), reply],
      }));
    }, 2000 + Math.random() * 2000);
  };

  const renderConversationItem = (c: Conversation) => (
    <button
      key={c.id}
      onClick={() => { setSelectedConversation(c.id); setShowMobileChat(true); }}
      className={`w-full flex items-start gap-3 p-4 transition-colors border-b ${border} ${selectedConversation === c.id
        ? (isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]')
        : hoverBg
        }`}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-[#0a0a0a] text-[#888]' : 'bg-[#eee] text-[#666]'} ring-1 ${isDark ? 'ring-white/5' : 'ring-black/5'}`} style={{ fontFamily: 'monospace' }}>{c.avatar}</div>
        {c.online && <span className={`absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 ${selectedConversation === c.id ? (isDark ? 'border-[#1a1a1a]' : 'border-[#f5f5f5]') : (isDark ? 'border-[#0a0a0a]' : 'border-white')}`} />}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-xs ${text} truncate`}>{c.name}</span>
          <span className={`text-[10px] ${textFaint} flex-shrink-0 ml-2`}>{c.time}</span>
        </div>
        <div className={`text-[10px] ${textFaint} mb-1 truncate`}>{c.role}</div>
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] ${c.unread > 0 ? text : textMuted} truncate`}>
            {c.lastMessage}
          </span>
          {c.unread > 0 && (
            <span className="w-5 h-5 bg-purple-500 text-white text-[9px] rounded-full flex items-center justify-center flex-shrink-0">
              {c.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );

  const renderMessages = () => {
    let lastDate = '';
    return currentMessages.map((msg) => {
      const showDate = msg.date && msg.date !== lastDate;
      if (msg.date) lastDate = msg.date;
      return (
        <div key={msg.id}>
          {showDate && (
            <div className="flex items-center justify-center my-4">
              <span className={`px-3 py-1 rounded-full text-[10px] ${isDark ? 'bg-[#1a1a1a] text-[#777]' : 'bg-[#f0f0f0] text-[#888]'}`}>
                {msg.date}
              </span>
            </div>
          )}
          <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-1`}>
            <div className={`max-w-[75%] ${msg.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`inline-block px-4 py-2.5 text-[13px] leading-relaxed ${msg.sender === 'me'
                ? 'bg-purple-500 text-white rounded-2xl rounded-br-sm'
                : isDark
                  ? 'bg-[#1a1a1a] text-[#e0e0e0] rounded-2xl rounded-bl-sm'
                  : 'bg-white text-[#222] rounded-2xl rounded-bl-sm border border-[#eaeaea]'
                } shadow-sm`}>
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 px-1 mt-0.5 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                <span className={`text-[10px] ${textFaint}`}>{msg.time}</span>
                {msg.sender === 'me' && (
                  <CheckCheck className={`w-3.5 h-3.5 ${msg.read ? 'text-purple-400' : textFaint}`} />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className={`rounded-lg border ${border} overflow-hidden flex h-full`}>
        {/* Conversations Sidebar */}
        <div className={`w-80 border-r ${border} flex flex-col ${cardBg} ${showMobileChat ? 'hidden md:flex' : 'flex'} flex-shrink-0`}>
          <div className={`p-4 border-b ${border}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-sm ${text}`}>Mensajes</h2>
              <span className={`text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400`}>
                {conversations.reduce((sum, c) => sum + c.unread, 0)} nuevos
              </span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${border} ${inputBg}`}>
              <Search className={`w-3.5 h-3.5 ${textFaint}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar conversaciones..."
                className={`flex-1 text-xs bg-transparent ${text} placeholder:${textMuted} focus:outline-none`}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {pinnedConvos.length > 0 && (
              <>
                <div className={`flex items-center gap-1.5 px-4 pt-3 pb-1`}>
                  <Pin className={`w-3 h-3 ${textFaint}`} />
                  <span className={`text-[10px] ${textFaint} uppercase tracking-wider`}>Fijados</span>
                </div>
                {pinnedConvos.map(renderConversationItem)}
              </>
            )}
            {otherConvos.length > 0 && (
              <>
                {pinnedConvos.length > 0 && (
                  <div className={`flex items-center gap-1.5 px-4 pt-3 pb-1`}>
                    <span className={`text-[10px] ${textFaint} uppercase tracking-wider`}>Todos los mensajes</span>
                  </div>
                )}
                {otherConvos.map(renderConversationItem)}
              </>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className={`h-16 px-4 md:px-6 flex items-center justify-between border-b ${border} ${cardBg} flex-shrink-0`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileChat(false)}
                className={`md:hidden p-1.5 rounded-md ${textMuted} ${hoverBg}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="relative">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#eee] text-[#666]'}`} style={{ fontFamily: 'monospace' }}>
                  {currentConvo?.avatar}
                </div>
                {currentConvo?.online && (
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 ${isDark ? 'border-[#0a0a0a]' : 'border-white'}`} />
                )}
              </div>
              <div>
                <span className={`text-sm ${text} block`}>
                  {currentConvo?.name}
                </span>
                <span className={`text-[10px] ${currentConvo?.online ? 'text-emerald-500' : textFaint}`}>
                  {isTyping ? 'Escribiendo...' : currentConvo?.online ? 'En línea' : 'Desconectado'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors`}>
                <Phone className="w-4 h-4" />
              </button>
              <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors`}>
                <Video className="w-4 h-4" />
              </button>
              <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors`}>
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4" style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)'
              : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}>
            {renderMessages()}
            {isTyping && (
              <div className="flex justify-start mb-1">
                <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${isDark ? 'bg-[#1a1a1a]' : 'bg-white border border-[#eaeaea]'} shadow-sm`}>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#555]' : 'bg-[#aaa]'} animate-bounce`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#555]' : 'bg-[#aaa]'} animate-bounce`} style={{ animationDelay: '150ms' }} />
                    <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#555]' : 'bg-[#aaa]'} animate-bounce`} style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-3 md:p-4 border-t ${border} ${cardBg} flex-shrink-0`}>
            <div className={`flex items-end gap-2 p-2.5 md:p-3 rounded-2xl border ${border} ${inputBg} focus-within:border-purple-500/50 transition-colors`}>
              <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors flex-shrink-0`}>
                <Paperclip className="w-4 h-4" />
              </button>
              <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors flex-shrink-0 hidden sm:block`}>
                <Image className="w-4 h-4" />
              </button>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe un mensaje..."
                rows={1}
                className={`flex-1 text-sm bg-transparent ${text} placeholder:${textMuted} focus:outline-none resize-none max-h-32`}
                style={{ minHeight: '24px' }}
              />
              <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors flex-shrink-0`}>
                <Smile className="w-4 h-4" />
              </button>
              {messageInput.trim() ? (
                <button
                  onClick={sendMessage}
                  className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <button className={`p-2 rounded-lg ${textFaint} ${hoverBg} transition-colors flex-shrink-0`}>
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className={`text-[10px] ${textFaint} mt-2 text-center hidden sm:block`}>
              Enter para enviar · Shift + Enter para nueva línea
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
