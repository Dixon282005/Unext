import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Crear cliente Supabase usando la cookie actual de la request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          // Refrescar la respuesta con las nuevas cookies si el token expira
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Obtener la sesión actual. getUser() refrescará el token si es necesario
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // RUTAS PROTEGIDAS DEL BACKEND
  // Protege específicamente el API de IA para evitar abusos
  if (pathname.startsWith('/api/chat') && !user) {
    return NextResponse.json(
      { error: 'No autorizado. Debes iniciar sesión.' },
      { status: 401 }
    )
  }

  // RUTAS DE FRONTEND
  // Si el usuario ya está autenticado y trata de ir a login/register, mándalo al dashboard
  if (user && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

// Configuración de rutas donde aplica el middleware
export const config = {
  matcher: [
    /*
     * Aplica el middleware a todas las rutas EXCEPTO:
     * - _next/static (archivos estáticos)
     * - _next/image (imágenes optimizadas)
     * - favicon.ico (ícono de página)
     * - /images/.* (tu carpeta pública de imágenes si aplica)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
