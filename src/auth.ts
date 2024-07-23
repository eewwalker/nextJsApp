import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prisma";


export const {
   auth,
   handlers: {GET, POST},
   signIn,
   signOut
  } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    ...authConfig,
    providers: [GitHub, Google],
})