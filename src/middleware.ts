
import { NextResponse } from 'next/server';
import {auth} from './auth';
import { publicRoutes, authRuotes } from './routes';


//middleware intercepts the request and can redirect the user to a different page
//e.g. a user clicks on a link to a page that requires authentication,
// the middleware can redirect the user to the login page

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
//config object is used to specify the routes that the middleware should run on
// or not run on, this config object means that the middleware will run on all
// routes except the ones that match the regex, which are the api routes, the
// static files, and the favicon file
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}