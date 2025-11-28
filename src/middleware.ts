import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing'; // <-- Fíjate que aquí no lleva .ts

export default createMiddleware(routing);

export const config = {
  // Coincide con todas las rutas pathname excepto las internas de Next.js
  matcher: ['/', '/(en|es|pt)/:path*']
};