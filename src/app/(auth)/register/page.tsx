"use client";

import { useState } from "react";
import Link from "next/link";
import { signupAction } from "@/features/auth/actions";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  UserPlus,
  Loader2,
} from "lucide-react";

export default function RegisterPage() {
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<"student" | "company">("student");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // 1. Validar contraseñas
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    // 2. Preparar datos limpios
    const dataToSend = new FormData();
    dataToSend.append("email", formData.get("email") as string);
    dataToSend.append("password", password);
    dataToSend.append("role", userType === "student" ? "candidate" : "company");

    // Lógica inteligente para nombres:
    if (userType === "company") {
      // Si es empresa, usamos el campo único y ponemos un punto en apellido
      dataToSend.append("name", formData.get("companyName") as string);
      dataToSend.append("lastname", ".");
    } else {
      // Si es estudiante, tomamos los dos campos separados
      dataToSend.append("name", formData.get("name") as string);
      dataToSend.append("lastname", formData.get("lastname") as string);
    }

    // 3. Enviar al servidor
    const result = await signupAction(dataToSend);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* Botón flotante para probar modo oscuro */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 z-50 text-xs"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
            isDark ? "bg-purple-500 opacity-20" : "bg-purple-200 opacity-40"
          }`}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
            isDark ? "bg-purple-600 opacity-20" : "bg-purple-300 opacity-30"
          }`}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
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
            Crea tu cuenta
          </h2>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Únete a la comunidad Unext
          </p>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
            isDark
              ? "bg-gray-900/50 border border-gray-800"
              : "bg-white/80 border border-gray-200 shadow-xl"
          }`}
        >
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Selector de Rol */}
            <div>
              <label
                className={`block mb-3 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ¿Qué eres?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    userType === "student"
                      ? "border-purple-500 bg-purple-500/10"
                      : isDark
                      ? "border-gray-700 hover:border-gray-600 text-gray-400"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <User
                    className={`w-5 h-5 ${
                      userType === "student" ? "text-purple-500" : ""
                    }`}
                  />
                  <span
                    className={
                      userType === "student"
                        ? "text-purple-500 font-medium"
                        : ""
                    }
                  >
                    Talento
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("company")}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    userType === "company"
                      ? "border-purple-500 bg-purple-500/10"
                      : isDark
                      ? "border-gray-700 hover:border-gray-600 text-gray-400"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <Building
                    className={`w-5 h-5 ${
                      userType === "company" ? "text-purple-500" : ""
                    }`}
                  />
                  <span
                    className={
                      userType === "company"
                        ? "text-purple-500 font-medium"
                        : ""
                    }
                  >
                    Empresa
                  </span>
                </button>
              </div>
            </div>

            {/* CAMPOS DE NOMBRE (CONDICIONALES) */}
            {userType === "company" ? (
              // CASO EMPRESA: UN SOLO INPUT
              <div>
                <label
                  htmlFor="companyName"
                  className={`block mb-2 text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Nombre de la empresa
                </label>
                <div className="relative">
                  <Building
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    placeholder="Mi Empresa S.A."
                    className={`w-full pl-11 pr-4 py-3 rounded-lg transition-all duration-200 outline-none border-2 ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                    }`}
                  />
                </div>
              </div>
            ) : (
              // CASO ESTUDIANTE: DOS INPUTS EN GRID
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block mb-2 text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Nombre
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Juan"
                      className={`w-full pl-11 pr-4 py-3 rounded-lg transition-all duration-200 outline-none border-2 ${
                        isDark
                          ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className={`block mb-2 text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Apellido
                  </label>
                  <div className="relative">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      required
                      placeholder="Pérez"
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-200 outline-none border-2 ${
                        isDark
                          ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

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
                  name="email"
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
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

            {/* Input Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isDark
                      ? "text-gray-500 hover:text-gray-400"
                      : "text-gray-400 hover:text-gray-600"
                  } transition-colors`}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 mt-6 font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Crear cuenta
                </>
              )}
            </button>
          </form>

          {/* Divider */}
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

          {/* Link to Login */}
          <p
            className={`text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-purple-500 hover:text-purple-400 transition-colors font-medium hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
