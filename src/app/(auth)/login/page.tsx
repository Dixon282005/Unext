"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/elements/button";
import { Input } from "@/app/components/ui/forms/input";
import { Label } from "@/app/components/ui/forms/label";
import { Github, Mail, Loader2 } from "lucide-react"; // Loader2 para el spinner
import { loginAction } from "@/features/auth/actions"; // <--- Tu server action

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    // Llamamos al servidor
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false); // Solo apagamos el loading si falló
    }
    // Si fue éxito, el servidor hace redirect, no hacemos nada aquí
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Bienvenido de nuevo
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <div className="grid gap-6">
        {/* ALERTA DE ERROR (Rojo) */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        {/* FORMULARIO CONECTADO */}
        <form action={handleSubmit}>
          <div className="grid gap-4">
            {/* EMAIL */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email" // <--- OBLIGATORIO
                placeholder="nombre@ejemplo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                name="password" // <--- OBLIGATORIO
                type="password"
                required
              />
            </div>

            {/* BOTÓN DE ENVIAR */}
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading} // Evita doble click
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-neutral-900 px-2 text-neutral-500 dark:text-neutral-400">
              O continúa con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full" type="button">
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" className="w-full" type="button">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>

      <p className="px-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400"
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
}
