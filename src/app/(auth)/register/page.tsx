"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Github, Mail } from "lucide-react";

export default function RegisterPage() {
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Juan" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Apellido</Label>
                <Input id="lastname" placeholder="Pérez" type="text" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="nombre@ejemplo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Crear Cuenta
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
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" className="w-full">
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
