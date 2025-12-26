import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 1. Agregamos 'async' a la función
export async function createClient() {
  // 2. Agregamos 'await' a cookies()
  const cookieStore = await cookies()


  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // El bloque try/catch es necesario para manejar casos donde
            // se llama desde un Server Component
          }
        },
      },
    }
  )
} 