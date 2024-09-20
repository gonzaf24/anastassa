import type { NextAuthConfig } from 'next-auth';
import { DefaultSession, Session } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    authorized({ auth, request: { nextUrl } }) {
      return !!auth;
    },
    async session({ session, token }): Promise<Session | DefaultSession> {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the same URL if it's already absolute
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
