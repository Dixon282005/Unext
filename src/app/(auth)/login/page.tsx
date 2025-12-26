"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/features/auth/actions";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  // Estados visuales
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estados de lógica
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // Llamada al Server Action real
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // Si es exitoso, el server action redirige automáticamente al dashboard
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* Botón flotante Dark Mode */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 z-50 text-xs"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
            isDark
              ? "bg-purple-500 opacity-20"
              : "bg-purple-200 opacity-40 animate-gradientShift"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
            isDark
              ? "bg-purple-600 opacity-20"
              : "bg-purple-300 opacity-30 animate-gradientShift"
          }`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block mb-4 hover:opacity-80 transition-opacity"
          >
            <h1
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              U<span className="text-purple-500">next</span>
            </h1>
          </Link>
          <h2
            className={`text-2xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Bienvenido de nuevo
          </h2>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Inicia sesión para continuar
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div
          className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
            isDark
              ? "bg-gray-900/50 border border-gray-800"
              : "bg-white/80 border border-gray-200 shadow-xl"
          }`}
        >
          {/* Mensaje de Error */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center flex items-center justify-center gap-2">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  id="email"
                  name="email" // Importante para FormData
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg transition-all duration-200 outline-none border-2 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  }`}
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  id="password"
                  name="password" // Importante para FormData
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 rounded-lg transition-all duration-200 outline-none border-2 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isDark
                      ? "text-gray-500 hover:text-gray-400"
                      : "text-gray-400 hover:text-gray-600"
                  } transition-colors`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Olvidé contraseña */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password" // Ruta futura
                className="text-sm text-purple-500 hover:text-purple-400 transition-colors hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Iniciando...
                </div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="relative my-6">
            <div
              className={`absolute inset-0 flex items-center ${
                isDark ? "opacity-20" : "opacity-40"
              }`}
            >
              <div
                className={`w-full border-t ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              />
            </div>
            <div className="relative flex justify-center">
              <span
                className={`px-4 text-sm ${
                  isDark
                    ? "bg-gray-900 text-gray-500"
                    : "bg-white text-gray-500"
                }`}
              >
                o
              </span>
            </div>
          </div>

          {/* Link Registro */}
          <p
            className={`text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="text-purple-500 hover:text-purple-400 transition-colors font-medium hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
