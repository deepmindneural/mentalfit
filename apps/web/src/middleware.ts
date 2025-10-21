import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// Configuración de i18n
const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: false // Deshabilitar detección automática, siempre español por defecto
});

export async function middleware(request: NextRequest) {
  // Validar variables de entorno críticas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ VARIABLES DE ENTORNO FALTANTES:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗ FALTANTE');
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗ FALTANTE');

    // Retornar respuesta sin autenticación si las variables no están configuradas
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  // Forzar redirección a español si detecta /en/
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const pathSinLocale = pathname.replace(/^\/en/, '') || '/';
    const nuevaUrl = new URL(pathSinLocale, request.url);
    console.log(`🔀 Redirigiendo de ${pathname} a ${pathSinLocale} (forzar español)`);
    return NextResponse.redirect(nuevaUrl);
  }

  // Primero ejecutar middleware de i18n
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    request = new NextRequest(intlResponse.url, {
      headers: request.headers
    });
  }
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
