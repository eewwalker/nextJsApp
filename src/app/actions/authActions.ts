'use server';
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { AuthError } from "next-auth";


export async function signOutUser() {
  await signOut({redirectTo: '/'});
}
//nextauth returns a session token as a cookie rather than a User
export async function signInUser(data: LoginSchema): Promise<ActionResult<string>>{
  try {

    //signIn(provider, {})
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })
    return {status: 'success', data: 'Logged In'}
  } catch (error) {
    console.log(error)
    //nextAuth provides specific types of errors
    if(error instanceof AuthError) {

      switch(error.type) {
        case 'CredentialsSignin':
          return {status: 'error', error: 'Invalid Credentials'}
        case 'CallbackRouteError':
            return {status: 'error', error: 'Invalid Credentials'}
          default:
            return {status: 'error', error: 'Something went wrong'}
      }
    } else {
      return {status: 'error', error: 'Something else went wrong' }
    }
  }
}

export async function registerUser(data: RegisterSchema):Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    //10 => COST FACTOR number of rounds of hashing for password
    //better security also takes more time to hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email }

    });
    if (existingUser) {
      return { status: 'error', error: 'User already exists' };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword
      }
    });

    return {status: 'success', data: user};

  } catch (e: any) {
    console.log(e);
    return {status: 'error', error: e.message};
  }
}

export async function getUserByEmail(email:string) {
  console.log('email', email)
  return prisma.user.findUnique({where: {email}});

}

export async function getUserById(id:string) {
  return prisma.user.findUnique({where: {id}});

}