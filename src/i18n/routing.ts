import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Una lista de todos los locales soportados
  locales: ['en', 'es', 'pt'],
 
  // Usado cuando no coincide ningún locale
  defaultLocale: 'en'
});
 
// Wrappers ligeros alrededor de las APIs de navegación de Next.js
// que considerarán el locale activo
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);