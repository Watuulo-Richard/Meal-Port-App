// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { UserRole } from "./user" // Import from your utility file

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      role: UserRole
      email: string
      image?: string
      phone?: string
      // isVerified: boolean
      token?: number
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    firstName: string
    lastName: string
    role: UserRole
    email: string
    image?: string
    phone?: string
    // isVerified: boolean
    token?: number
    password?: string // Only used during authorization, not exposed in session
  }

  interface Profile {
    given_name?: string
    family_name?: string
    picture?: string
    email_verified?: boolean
    // isVerified: boolean
    sub?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    firstName: string
    lastName: string
    role: UserRole
    email: string
    picture?: string
    phone?: string
    // isVerified: boolean
    token?: number
  }
}

// Optional: Extend the database adapter types if using Prisma
declare module "@auth/prisma-adapter" {
  interface AdapterUser {
    id: string
    firstName: string
    lastName: string
    role: UserRole
    email: string
    image?: string
    phone?: string
    // isVerified: boolean
    token?: number
    emailVerified?: Date | null
    createdAt: Date
    updatedAt: Date
  }
}