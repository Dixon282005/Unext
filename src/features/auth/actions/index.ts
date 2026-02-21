"use server"

import { createClient } from '@/lib/supabase/server'
// import { redirect } from 'next/navigation' // No usamos redirect para no romper el SPA flow
import { revalidatePath } from 'next/cache'

// =================================================================
// 1. INICIAR SESIÓN (LOGIN)
// =================================================================
export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login error:', error.message)
    return { error: 'Credenciales inválidas. Verifica tu correo y contraseña.' }
  }

  // Si estamos en un setup de páginas anidadas, revalidaríamos layout
  revalidatePath('/', 'layout')
  
  return { 
    success: true, 
    user: { 
      email: data.user?.email || email,
      name: data.user?.user_metadata?.full_name || 'Usuario'
    } 
  }
}

// =================================================================
// 2. REGISTRO (SIGNUP) - ¡CON VALIDACIONES DE SEGURIDAD! 🛡️
// =================================================================
export async function signupAction(formData: FormData) {
  const supabase = await createClient()

  // 1. Extraemos TODOS los datos
  const name = formData.get('name') as string // Se usará como Full Name
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  
  // Si no viene rol, asumimos 'user' por seguridad
  const role = (formData.get('role') as string) || 'student' 

  // 2. Validaciones Básicas (Campos vacíos)
  if (!email || !password || !name) {
    return { error: 'Por favor completa todos los campos requeridos.' }
  }

  // 3. VALIDACIÓN DE CONTRASEÑA ROBUSTA 🔐
  
  // A) Coincidencia
  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden.' }
  }

  // B) Longitud mínima (8 caracteres)
  if (password.length < 8) {
    return { error: 'La contraseña debe tener al menos 8 caracteres.' }
  }

  // C) Caracteres especiales (Regex)
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>_]/;
  if (!specialCharRegex.test(password)) {
    return { error: 'La contraseña debe incluir al menos un carácter especial (ej: @, #, !).' }
  }

  // D) Al menos un número y una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    return { error: 'La contraseña debe incluir al menos una letra mayúscula.' }
  }
  if (!/[0-9]/.test(password)) {
    return { error: 'La contraseña debe incluir al menos un número.' }
  }

  // 4. Creamos el usuario en Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name, 
        role: role, 
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { error: error.message }
  }

  return { success: true, user: { email, name } }
}

// =================================================================
// 3. CERRAR SESIÓN (LOGOUT)
// =================================================================
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return { success: true }
}
