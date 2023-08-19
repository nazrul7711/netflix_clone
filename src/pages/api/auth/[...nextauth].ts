import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("email and password both required");
        }
        let existingUser = await prismadb.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser || !existingUser.hashedPassword) {
          throw new Error("No user with this email or password is missing");
        }
        let ifCorrectPassword = await compare(
          credentials?.password,
          existingUser?.hashedPassword
        );
        if (!ifCorrectPassword) {
          throw new Error("password does not match");
        }
        return existingUser;
      },
    }),
  ],
  pages: { signIn: "/auth" },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(nextAuthOptions);

