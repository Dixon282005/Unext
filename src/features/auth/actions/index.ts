"use server" // <--- OBLIGATORIO: Define que esto corre en el servidor

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// =================================================================
// 1. INICIAR SESIÓN (LOGIN)
// =================================================================
export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  // Extraemos los datos del formulario
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Intentamos loguear en Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Si falla, retornamos el error para que el frontend lo pinte en rojo
    console.error('Login error:', error.message)
    return { error: 'Credenciales inválidas. Verifica tu correo y contraseña.' }
  }

  // SI TODO SALE BIEN:
  // 1. Limpiamos la caché para que la barra de navegación se entere que entraste
  revalidatePath('/', 'layout')
  
  // 2. Redirigimos al Dashboard
  redirect('/dashboard') 
}

// =================================================================
// 2. REGISTRO (SIGNUP)
// =================================================================
export async function signupAction(formData: FormData) {
  const supabase = await createClient()

  // Extraemos los datos (asegúrate que tus inputs tengan name="...")
  const firstName = formData.get('name') as string
  const lastName = formData.get('lastname') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validamos que no falte nada
  if (!email || !password || !firstName || !lastName) {
    return { error: 'Por favor completa todos los campos.' }
  }

  // Creamos el nombre completo
  const fullName = `${firstName} ${lastName}`.trim()

  // Creamos el usuario
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Guardamos el nombre en la metadata.
      // IMPORTANTE: Esto es lo que usa tu Trigger SQL para llenar la tabla 'profiles'
      data: {
        full_name: fullName, 
      },
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { error: error.message }
  }

  // SI TODO SALE BIEN:
  // Redirigimos al login avisando que revisen el correo (si tienes confirmación de email activa)
  // O simplemente para que inicien sesión.
  redirect('/login') 
}

// =================================================================
// 3. CERRAR SESIÓN (LOGOUT)
// =================================================================
export async function logoutAction() {
  const supabase = await createClient()
  
  // Cerramos la sesión en el servidor
  await supabase.auth.signOut()
  
  // Limpiamos caché para que la barra de navegación borre el usuario
  revalidatePath('/', 'layout')
  
  // Lo mandamos al login de vuelta
  redirect('/login')
}