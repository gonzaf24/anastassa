import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const url = req.nextUrl.clone();

  const session = await auth();

  // Verificar si la ruta es "/login" y el usuario ya tiene sesión
  if (url.pathname === '/login' && session) {
    // Redirigir a "/admin" si ya hay sesión
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Si no hay sesión, redirigir a "/" home para las rutas protegidas
  if (!session && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  // Permitir continuar si no se cumplen las condiciones anteriores
  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
