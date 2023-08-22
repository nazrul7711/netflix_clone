import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";


export const nextAuthO: NextAuthOptions = {
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
      name:"janki",
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

export default NextAuth(nextAuthO);


/*
NEXTAUTH_URL PROD
NEXTAUTH_SECRET encrypt JWT
secret: encrypt cookies generate cruptic keys yes in production a string value  PROD
session:OPTIONAL to strategy :"jwt"
jwt:OPTIONAL to define seperate configuration for jwt
pages:{signIn:"/auth"}
in req:callback-url,session-token,csrftoken
getToken({req})

import CredentialsProvider from "next-auth/provider/credentials"
CredentaislProvider({name:"name to be provided in sign in form",credentails:{name:{label:,type},email:{ }}})


*/