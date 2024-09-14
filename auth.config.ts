import type { NextAuthConfig } from 'next-auth';
import { DefaultSession, Session } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      console.log('isLoggedIn : ', isLoggedIn);
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      console.log('isOnAdmin : ', isOnAdmin);
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl));
      }else {
        return true;
      }
    },
    async session({ session, token }): Promise<Session | DefaultSession> {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
