"use client";

import { useState } from "react";
import { 
  Search, Phone, Video, MoreHorizontal, Paperclip, Smile, Send, MessageSquare 
} from "lucide-react";
// Asegúrate de importar la data falsa
import { conversations, messages } from "@/features/dashboard/lib/mockdata";

interface MessagesViewProps {
  isDark: boolean;
}

export function MessagesView({ isDark }: MessagesViewProps) {
  // --- ESTADOS LOCALES (Ahora viven aquí dentro) ---
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Aquí conectarás el backend en el futuro
      console.log("Enviando:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div
      className={`rounded-2xl border overflow-hidden flex flex-col md:flex-row h-[calc(100vh-12rem)] ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      {/* --- COLUMNA IZQUIERDA: LISTA DE CHATS --- */}
      <div
        className={`w-full md:w-80 border-b md:border-b-0 md:border-r ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Buscar mensajes..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4.5rem)]">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedConversation(chat.id)}
              className={`p-4 border-b cursor-pointer transition-colors ${
                isDark ? "border-gray-800" : "border-gray-100"
              } ${
                selectedConversation === chat.id
                  ? isDark
                    ? "bg-purple-900/10 border-l-4 border-l-purple-500"
                    : "bg-purple-50 border-l-4 border-l-purple-500"
                  : isDark
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {chat.name}
                    </h4>
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate ${
                      chat.unread > 0
                        ? isDark
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                        : isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-medium">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- COLUMNA DERECHA: VENTANA DE CHAT --- */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900/50">
        {selectedConversation ? (
          <>
            {/* Header del Chat */}
            <div
              className={`p-4 border-b flex items-center justify-between ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                  {conversations[0].avatar}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {conversations[0].name}
                  </h3>
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    En línea
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                  <Phone className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                  <Video className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 ${
                      msg.sender === "me"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : isDark
                        ? "bg-gray-800 text-white rounded-bl-none"
                        : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === "me" ? "text-purple-200" : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className={`p-4 border-t ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  className={`p-2 rounded-full transition-colors ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-400"
                      : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendMessage()
                  }
                  placeholder="Escribe un mensaje..."
                  className={`flex-1 px-4 py-2 rounded-full text-sm ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-100 border-transparent text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                />
                <button
                  className={`p-2 rounded-full transition-colors ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-400"
                      : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className={`p-2 rounded-full ${
                    messageInput.trim()
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-600"
                      : isDark
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } transition-all`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-lg font-medium mb-2">
              Selecciona una conversación
            </h3>
            <p className="text-sm max-w-sm">
              Elige un chat de la lista para ver el historial y enviar
              mensajes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}