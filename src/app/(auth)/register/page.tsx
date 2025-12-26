"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/elements/button";
import { Input } from "@/app/components/ui/forms/input";
import { Label } from "@/app/components/ui/forms/label";
import { Github, Mail, Loader2 } from "lucide-react"; // Importamos Loader2 para el spinner
import { signupAction } from "@/features/auth/actions"; // <--- IMPORTANTE: Tu lógica del servidor

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Esta función intercepta el envío para manejar la carga y errores visuales
  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    // Llamamos al Server Action
    const result = await signupAction(formData);

    // Si hay error, apagamos el loading y mostramos el mensaje
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Si es exitoso, el redirect ocurre en el servidor, no necesitamos hacer nada aquí.
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Crear una cuenta
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Ingresa tus datos para comenzar en Unext
        </p>
      </div>

      <div className="grid gap-6">
        {/* ALERTA DE ERROR (Solo aparece si algo falla) */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        {/* FORMULARIO CONECTADO */}
        <form action={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name" // <--- OBLIGATORIO
                  placeholder="Juan"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  id="lastname"
                  name="lastname" // <--- OBLIGATORIO
                  placeholder="Pérez"
                  type="text"
                  required
                />
              </div>
            </div>

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

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password" // <--- OBLIGATORIO
                type="password"
                required
                minLength={6}
              />
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading} // Desactivamos si está cargando
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
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
              O regístrate con
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
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400"
        >
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}
