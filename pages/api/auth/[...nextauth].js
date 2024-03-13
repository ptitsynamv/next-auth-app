import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const userData = await fetch(
          `http://localhost:3001/users?email=${credentials.email}`
        );
        const [user] = await userData.json();
        if (!user) {
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return { email: user.email };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { jwt: true },
};

export default NextAuth(authOptions);
