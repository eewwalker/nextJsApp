
import { NextResponse } from 'next/server';
import {auth} from './auth';
import { publicRoutes, authRuotes } from './routes';



export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRuotes.includes(nextUrl.pathname);

  if (isPublic) {
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/members', nextUrl));
    }
    return NextResponse.next();
  }
  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

    return NextResponse.next();


})